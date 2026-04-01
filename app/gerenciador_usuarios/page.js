'use client'

import { useState, useEffect } from 'react'
import supabase from '../conexao/bancos';

function GerenciadorUsuarios() {

    const [nome, alteraNome] = useState("")
    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")
    const [administrador, alteraAdministrador] = useState(false)
    const [usuarios, alteraUsuarios] = useState([])
    const [editandoId, alteraEditandoId] = useState(null);
    const [pesquisa, alteraPesquisa] = useState("")

    useEffect(() => {
        buscar();
    }, []);

    const listaFiltrada = usuarios.filter(item =>
        (item.nome || "").toLowerCase().includes(pesquisa.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(pesquisa.toLowerCase())
    )

    async function buscar() {
        const res = await supabase.from('usuarios').select()

        if (res.data) {
            alteraUsuarios(res.data)
        } else {
            alert("Erro ao buscar")
            console.log(res.error)
        }
    }

    async function salvar() {

        if (!nome || !email || (!editandoId && !senha)) {
            alert("Preencha tudo")
            return;
        }

        if (editandoId) {
            await supabase
                .from('usuarios')
                .update({ nome, email, administrador })
                .eq('id', editandoId)

        } else {

            const res = await supabase.auth.signUp({
                email: email,
                password: senha,
            })

            if (res.data.user) {
                await supabase
                    .from('usuarios')
                    .insert({
                        id: res.data.user.id,
                        nome: nome,
                        email: email,
                        administrador: administrador
                    })
            }
        }

        alert("Salvo!")
        limpar()
        buscar()
    }

    function limpar() {
        alteraNome("")
        alteraEmail("")
        alteraSenha("")
        alteraAdministrador(false)
        alteraEditandoId(null)
    }

    function editar(usuario) {
        alteraNome(usuario.nome)
        alteraEmail(usuario.email)
        alteraAdministrador(usuario.administrador)
        alteraEditandoId(usuario.id)
    }

    async function deletar(id) {
        if (!confirm("Deletar?")) return;

        await supabase.from('usuarios')
            .delete()
            .eq('id', id)

        buscar()
    }

    return (
        <div className="container mt-4">

            <div className="card">

                <div className="card-header d-flex justify-content-between">
                    <h5>Usuários</h5>

                    <button
                        className="btn btn-success btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#modalUsuario"
                        onClick={limpar}
                    >
                        + Novo
                    </button>
                </div>

                <div className="card-body">

                    <input
                        className="form-control mb-3"
                        placeholder="Pesquisar"
                        value={pesquisa}
                        onChange={e => alteraPesquisa(e.target.value)}
                    />

                    <table className="table">

                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listaFiltrada.map(item => (
                                <tr >
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.administrador ? "Sim" : "Não"}</td>

                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editar(item)}
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalUsuario"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deletar(item.id)}
                                        >
                                            Deletar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>
            </div>




            {/* parte de modal */}


            <div className="modal fade" id="modalUsuario" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">
                                {editandoId ? "Editar Usuário" : "Novo Usuário"}
                            </h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">

                            <input
                                className="form-control mb-2"
                                placeholder="Nome"
                                value={nome}
                                onChange={e => alteraNome(e.target.value)}
                            />

                            <input
                                className="form-control mb-2"
                                placeholder="Email"
                                value={email}
                                onChange={e => alteraEmail(e.target.value)}
                            />

                            {!editandoId && (
                                <input
                                    type="password"
                                    className="form-control mb-2"
                                    placeholder="Senha"
                                    value={senha}
                                    onChange={e => alteraSenha(e.target.value)}
                                />
                            )}

                            <select
                                className="form-control"
                                value={administrador.toString()}
                                onChange={e => alteraAdministrador(e.target.value === "true")}
                            >
                                <option value="false">Comum</option>
                                <option value="true">Admin</option>
                            </select>

                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancelar
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={salvar}
                                data-bs-dismiss="modal"
                            >
                                Salvar
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default GerenciadorUsuarios;