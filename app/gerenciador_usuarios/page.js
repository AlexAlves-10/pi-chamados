'use client'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { useState } from 'react'
import "./Gerenciador_usuarios.css";
import supabase from '../conexao/bancos';

function GerenciadorUsuarios() {

    const [nome, alteraNome] = useState("")
    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")
    const [administrador, alteraAdministrador] = useState(false)
    const [usuarios, alteraUsuarios] = useState([])
    const [mostrarForm, alteraMostrarForm] = useState(false)

    async function buscar() {
        const { data, error } = await supabase
            .from('usuarios')
            .select()

        console.log(data)
        alteraUsuarios(data)
    }

    async function salvar() {

        const objeto = {
            nome: nome,
            email: email,
            senha: senha,
            administrador: administrador === true
        }

        const { error } = await supabase
            .from('usuarios')
            .insert(objeto)

        console.log(error)

        if (error == null) {
            alert("Usuário cadastrado com sucesso!")
            alteraNome("")
            alteraEmail("")
            alteraSenha("")
            alteraAdministrador(false)
            alteraMostrarForm(false)
            buscar()
        } else {
            alert("Dados invalidos, verifique os campos e tente novamente...")
        }
    }

    return (
        <div className="col-9 p-4 bg-light">
            <div className="card shadow-sm rounded-3">

                <div className="card-header d-flex justify-content-between">
                    <h5>Lista de Usuários</h5>
                    <button className="btn btn-success btn-sm" onClick={() => alteraMostrarForm(!mostrarForm)}>
                        {mostrarForm ? "Fechar" 
                        : "+ Adicionar"}
                    </button>
                </div>

                <div className="card-body">

                    {mostrarForm && (
                        <div>
                            <p> Digite o nome do Usuário: </p>
                            <input className="form-control" value={nome} onChange={e => alteraNome(e.target.value)} />

                            <p> Digite o email do Usuário: </p>
                            <input className="form-control" value={email} onChange={e => alteraEmail(e.target.value)} />

                            <p> Digite a senha do Usuário: </p>
                            <input className="form-control" type="password" value={senha} onChange={e => alteraSenha(e.target.value)} />

                            <p> O usuário é administrador? </p>
                            <select className="form-control" value={administrador} onChange={e => alteraAdministrador(e.target.value)}>
                                <option value="false">Não (Usuário Comum)</option>
                                <option value="true">Sim (Admin)</option>
                            </select>
                            <br />

                            <button onClick={salvar} type='button' className='btn btn-success' > Salvar Usuário </button>
                            <hr />
                        </div>
                    )}

                    <button onClick={buscar} type='button' className='btn btn-primary' > Carregar Usuários </button>
                    <br /><br />

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
                            {usuarios.map(item => (
                                <tr >
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.administrador ? "Sim" : "Não"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default GerenciadorUsuarios;