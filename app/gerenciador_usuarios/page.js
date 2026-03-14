'use client'
import { createClient } from '@supabase/supabase-js'
import "./Gerenciador_usuarios.css";
import { useEffect, useState } from "react";
const supabase = createClient('https://ekdskhpbgorgflhhehfp.supabase.co', 'sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ')




export default function GerenciadorUsuarios() {

    const [nome, alterarNome] = useState("")
    const [email, alterarEmail] = useState("")
    const [senha, alterarSenha] = useState("")
    const [administrador, alterarAdministrador] = useState(false)
    const [listaUsuarios, alterarListaUsuarios] = useState([])
    const [mostrarForm, alterarMostrarForm] = useState(false)

    async function buscar() {

        const { data, error } = await supabase
            .from('usuarios')
            .select('*')

        if (!error) {
            alterarListaUsuarios(data)
        }

    }

    useEffect(function () {
        buscar()
    }, [])

    async function salvar(e) {

        e.preventDefault()

        const objeto = {
            nome: nome,
            email: email,
            senha: senha,
            administrador: administrador
        }

        const { error } = await supabase
            .from('usuarios')
            .insert([objeto])

        if (error) {
            console.log(error)
        }

        buscar()

        alterarNome("")
        alterarEmail("")
        alterarSenha("")
        alterarAdministrador(false)
        alterarMostrarForm(false)

    }

    return (

        <div className="col-9 p-4 bg-light">

            <div className="card shadow-sm rounded-3">

                <div className="card-header d-flex justify-content-between">

                    <h5>Lista de Usuários</h5>

                    <button
                        className="btn btn-success btn-sm"
                        onClick={() => alterarMostrarForm(true)}
                    >
                        + Adicionar
                    </button>

                </div>

                <div className="card-body">

                    {mostrarForm && (

                        <form onSubmit={salvar} className="mb-3">

                            <input
                                value={nome}
                                placeholder="Nome"
                                onChange={(e) => alterarNome(e.target.value)}
                                className="form-control mb-2"
                            />

                            <input
                                value={email}
                                placeholder="Email"
                                onChange={(e) => alterarEmail(e.target.value)}
                                className="form-control mb-2"
                            />

                            <input
                                value={senha}
                                placeholder="Senha"
                                onChange={(e) => alterarSenha(e.target.value)}
                                className="form-control mb-2"
                            />

                            <select
                                value={administrador ? "true" : "false"}
                                onChange={(e) => alterarAdministrador(e.target.value === "true")}
                                className="form-control mb-2"
                            >

                                <option value="false">Usuário</option>
                                <option value="true">Administrador</option>

                            </select>

                            <button className="btn btn-primary btn-sm">
                                Salvar
                            </button>

                        </form>

                    )}

                    <table className="table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                            </tr>
                        </thead>

                        <tbody>

                            {listaUsuarios.map(function (usuario) {

                                return (

                                    <tr key={usuario.id}>

                                        <td>{usuario.id}</td>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.administrador ? "Admin" : "Usuário"}</td>

                                    </tr>

                                )

                            })}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    )

}