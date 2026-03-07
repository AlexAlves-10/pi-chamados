'use client'
import "./Gerenciador_usuarios.css";
import { useState } from "react";

export default function GerenciadorUsuarios() {

    const [id, alterarId] = useState("")
    const [nome, alterarNome] = useState("")
    const [email, alterarEmail] = useState("")
    const [status, alterarStatus] = useState("")

    const [mostrarForm, alterarMostrarForm] = useState(false)

    const [listaUsuarios, alterarListaUsuarios] = useState(
        [
            { id: 1, nome: "João Silva", email: "joaosilva@gmail.com", status: "admin" },
            { id: 2, nome: "Maria Oliveira", email: "maria.oliveira@gmail.com", status: "usuario" },
            { id: 3, nome: "Carlos Mendes", email: "carlos.mendes@gmail.com", status: "usuario" },
            { id: 4, nome: "Ana Costa", email: "ana.costa@gmail.com", status: "admin" },
            { id: 5, nome: "Pedro Santos", email: "pedro.santos@gmail.com", status: "usuario" }
        ]
    )

    function preencherFormulario(usuarioClicado) {
        alterarId(usuarioClicado.id)
        alterarNome(usuarioClicado.nome)
        alterarEmail(usuarioClicado.email)
        alterarStatus(usuarioClicado.status)
        alterarMostrarForm(true)
    }

    function excluir(idParaRemover) {
        const listaNova = listaUsuarios.filter(function(usuario) {
            return usuario.id !== idParaRemover
        })
        alterarListaUsuarios(listaNova)
    }

    function salvar(e) {
        e.preventDefault()
        const objeto = {
            id: id,
            nome: nome,
            email: email,
            status: status,
        }

        const usuarioExiste = listaUsuarios.find(function(usuario) {
            return usuario.id == id
        })

        if (usuarioExiste) {
            const listaEditada = listaUsuarios.map(function(usuario) {
                if (usuario.id == id) {
                    return objeto
                } else {
                    return usuario
                }
            })
            alterarListaUsuarios(listaEditada)
        } else {
            alterarListaUsuarios(listaUsuarios.concat(objeto))
        }

        alterarId(""); alterarNome(""); alterarEmail(""); alterarStatus("")
        alterarMostrarForm(false)
    }

    return (
        <div className="col-9 p-4 bg-light">
            <div className="card shadow-sm rounded-3">

                <div className="card-header bg-white d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="mb-0 fw-semibold">👤 Lista de Usuários</h5>
                   
                    <button
                        className="btn btn-success btn-sm"
                        onClick={function() {
                            alterarId(""); alterarNome(""); alterarEmail(""); alterarStatus("");
                            alterarMostrarForm(true);
                        }}
                    >
                        + Adicionar Usuário
                    </button>
                </div>

                <div className="card-body">

                    {mostrarForm && (
                        <form onSubmit={salvar} className="mb-4 p-3 border rounded bg-white shadow-sm">
                            <h6 className="fw-bold">Dados do Usuário:</h6>
                            <div className="d-flex gap-2 mb-2">
                                <input value={id} placeholder="ID" onChange={function(e) { alterarId(e.target.value) }} className="form-control" />
                                <input value={nome} placeholder="Nome" onChange={function(e) { alterarNome(e.target.value) }} className="form-control" />
                                <input value={email} placeholder="Email" onChange={function(e) { alterarEmail(e.target.value) }} className="form-control" />
                                <input value={status} placeholder="Status" onChange={function(e) { alterarStatus(e.target.value) }} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm me-2">Salvar</button>
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={function() { alterarMostrarForm(false) }}
                            >
                                Cancelar
                            </button>
                        </form>
                    )}

                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NOME</th>
                                <th scope="col">GMAIL</th>
                                <th scope="col">CLASSIFICAÇÃO</th>
                                <th scope="col" className="text-center">AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaUsuarios.map(function(usuario) {
                                return (
                                    <tr>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.status}</td>
                                        <td className="text-center">
                                            <button 
                                                className="btn btn-outline-primary btn-sm me-2"
                                                onClick={function() { preencherFormulario(usuario) }}
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={function() { excluir(usuario.id) }}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}