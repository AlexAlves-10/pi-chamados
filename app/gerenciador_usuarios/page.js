'use client'
import { useState, useEffect } from 'react'
import "./Gerenciador_usuarios.css";
import supabase from '../conexao/bancos';

function GerenciadorUsuarios() {
    const [nome, alteraNome] = useState("")
    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")
    const [administrador, alteraAdministrador] = useState(false)
    const [usuarios, alteraUsuarios] = useState([])
    const [mostrarForm, alteraMostrarForm] = useState(false)
    const [editandoId, alteraEditandoId] = useState(null);
    const [pesquisa, alteraPesquisa] = useState("")

    useEffect(function () {
        buscar();
    }, []);

    const listaFiltrada = usuarios.filter(
        (item) => item.nome.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase()) ||
            item.email.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())
    )

    async function buscar() {
        const { data, error } = await supabase
            .from('usuarios')
            .select()
            .order('id', { ascending: true })

        if (data) alteraUsuarios(data)
    }

    async function salvar() {
        if (!nome || !email || (!editandoId && !senha)) {
            alert("Preencha todos os campos!")
            return;
        }

        if (editandoId) {
            const { error } = await supabase
                .from('usuarios')
                .update({ nome, email, administrador })
                .eq('id', editandoId)

            if (error) {
                alert("Erro ao atualizar")
                return
            }
        } else {
            const { data, error: authError } = await supabase.auth.signUp({
                email: email,
                password: senha,
            })

            if (authError) {
                alert("Erro no cadastro: " + authError.message)
                return
            }

            
            if (data.user) {
                const { error: dbError } = await supabase
                    .from('usuarios')
                    .insert({
                        id: data.user.id,
                        nome: nome,
                        email: email,
                        administrador: administrador
                    })

                if (dbError) {
                    alert("Erro ao gravar na tabela")
                    return
                }
            }
        }

        alert("Operação realizada!")
        fecharModal();
        buscar();
    }

    function fecharModal() {
        alteraNome("")
        alteraEmail("")
        alteraSenha("")
        alteraAdministrador(false)
        alteraEditandoId(null)
        alteraMostrarForm(false)
    }

    function editar(usuario) {
        alteraNome(usuario.nome);
        alteraEmail(usuario.email);
        alteraSenha("");
        alteraAdministrador(usuario.administrador);
        alteraEditandoId(usuario.id)
        alteraMostrarForm(true)
    }

    async function deletar(id) {
        if (!confirm("Deseja deletar?")) return;
        const { error } = await supabase.from('usuarios').delete().eq('id', id);
        if (!error) buscar();
    }

    return (
        <div className="col-9 p-4 bg-light">
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Lista de Usuários</h5>
                    <button className="btn btn-success btn-sm" onClick={() => alteraMostrarForm(true)}>
                        + Adicionar Novo
                    </button>
                </div>

                <div className="card-body">
                    <input className="form-control mb-3" placeholder="Pesquisar..." value={pesquisa}
                        onChange={e => alteraPesquisa(e.target.value)} />

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>NOME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaFiltrada.map(item => (
                                <tr>
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <span className={`badge ${item.administrador ? 'bg-primary' : 'bg-secondary'}`}>
                                            {item.administrador ? "Sim" : "Não"}
                                        </span>
                                    </td>
                                    <td>
                                        <button className='btn btn-warning btn-sm me-2' onClick={() => editar(item)}>EDITAR</button>
                                        <button className='btn btn-danger btn-sm' onClick={() => deletar(item.id)}>DELETAR</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {mostrarForm && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editandoId ? "Editar Usuário" : "Novo Usuário"}</h5>
                                <button type="button" className="btn-close" onClick={fecharModal}></button>
                            </div>
                            <div className="modal-body">
                                <input className="form-control mb-2" placeholder="Nome" value={nome} onChange={e => alteraNome(e.target.value)} />
                                <input className="form-control mb-2" placeholder="Email" value={email} onChange={e => alteraEmail(e.target.value)} />

                                {!editandoId && (
                                    <input className="form-control mb-2" type="password" placeholder="Senha" value={senha} onChange={e => alteraSenha(e.target.value)} />
                                )}

                                <select className="form-control" value={administrador.toString()} onChange={e => alteraAdministrador(e.target.value === "true")}>
                                    <option value="false">Usuário Comum</option>
                                    <option value="true">Administrador</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={fecharModal}>Cancelar</button>
                                <button className="btn btn-success" onClick={salvar}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GerenciadorUsuarios;