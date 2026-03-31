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


    useEffect(() => {
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
        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!")
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha,
        })
        console.log(data, error)
        if(data.user == null){
            console.log("ae seu burro esqueceu do emil ou sena")
            return
        }

        const objeto = {
            id: data.user.id,
            nome: nome,
            email: email,
            senha: senha,
            administrador: administrador,
        }

        if (editandoId) {
            const { error } = await supabase
                .from('usuarios')
                .update(objeto)
                .eq('id', editandoId)
            if (error) {
                alert("erro ao atualizar")
                return
            }
            alert("Atualizado com sucesso!")
        } else {
            const { error } = await supabase
                .from('usuarios')
                .insert(objeto)

                console.log(error)
            if (error) {
                alert("erro ao cadastrar")
                return
            }
            alert("Cadastrado com sucesso!")
        }

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

    async function editar(usuario) {
        alteraNome(usuario.nome);
        alteraEmail(usuario.email);
        alteraSenha(usuario.senha);
        alteraAdministrador(usuario.administrador);
        alteraEditandoId(usuario.id)
        alteraMostrarForm(true)
    }

    async function deletar(id) {
        const confirmar = confirm("Deseja deletar?");
        if (!confirmar) return;

        const { error } = await supabase
            .from('usuarios')
            .delete()
            .eq('id', id);

        if (error) {
            alert("Erro ao deletar")
            return
        }

        alert("Deletado!")
        buscar()
    }

    return (
        <div className="col-9 p-4 bg-light">
            <div className="card shadow-sm rounded-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Lista de Usuários</h5>
                    <button className="btn btn-success btn-sm" onClick={() => alteraMostrarForm(true)}>
                        + Adicionar Novo
                    </button>
                </div>

                <div className="card-body">
                    <div className='d-flex align-items-center gap-3 mb-3'>
                        <div className="input-group ms-auto" style={{ width: "100%" }}>
                            <input className="form-control" placeholder="Pesquisar por nome ou email..." value={pesquisa}
                                onChange={e => alteraPesquisa(e.target.value)} />
                            <button className="btn btn-outline-secondary">🔎</button>
                        </div>
                    </div>

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
                                <tr key={item.id}>

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
                                <div className="mb-3">
                                    <label className="form-label">Nome do Usuário</label>
                                    <input className="form-control" value={nome} onChange={e => alteraNome(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input className="form-control" value={email} onChange={e => alteraEmail(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input className="form-control" type="password" value={senha} onChange={e => alteraSenha(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Nível de Acesso</label>
                                    <select className="form-control" value={administrador} onChange={e => alteraAdministrador(e.target.value === "true")}>
                                        <option value="false">Usuário Comum</option>
                                        <option value="true">Administrador</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={fecharModal}>Cancelar</button>
                                <button type="button" className="btn btn-success" onClick={salvar}>
                                    {editandoId ? "Salvar Alterações" : "Cadastrar Usuário"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GerenciadorUsuarios;