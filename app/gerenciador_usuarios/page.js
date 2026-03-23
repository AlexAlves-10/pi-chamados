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
    const [editandoId, alteraEditandoId] = useState(null);

    async function buscar() {
        const { data, error } = await supabase
            .from('usuarios')
            .select()
            .order('id', { ascending: true })

        console.log(data)
        alteraUsuarios(data)
    }

    // O salvar inteiro, ele faz a validação do EDITAR e a validação se o campo esta preenchido,
    // primeiro CONST: const [editandoId, alteraEditandoId] = useState(); SEGUNDO: mudar os campos necessario do salvar (tem bsatante.)
    async function salvar() {
        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!")
            return;
        }

        const objeto = {
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
                console.log(error)
                alert("erro ao atualizar")
                return
            }
            alert("atualizado")
        } else {
            const { error } = await supabase
                .from('usuarios')
                .insert(objeto)

            if (error) {
                console.log(error)
                alert("erro ao cadastrar")
                return
            }
            alert("cadastrado!")
        }
        alteraNome("")
        alteraEmail("")
        alteraSenha("")
        alteraAdministrador(false)
        alteraEditandoId(null)
        alteraMostrarForm(false)

        buscar()
    }
// para o editar tambem é necessario pegar isso, porem voce muda os campos que necessario
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
        if (confirmar == false) return;

        const { error } = await supabase
            .from('usuarios')
            .delete()
            .eq('id', id);

        if (error) {
            console.log(error)
            alert("Erro ao deletar")
            return
        }

        alert("Deletado!")
        buscar()
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
                            <select className="form-control" value={administrador} onChange={e => alteraAdministrador(e.target.value === "true")}>
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
                                <th>AÇOES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(item => (
                                <tr >
                                    <td>{item.id}</td>
                                    <td>{item.nome}</td>
                                    <td>{item.email}</td>
                                    <td>{item.administrador ? "Sim" : "Não"}</td>
                                    <td><button className='btn btn-warning btn-sm me-2' onClick={() => editar(item)}>  EDITAR </button>
                                        <button className='btn btn-danger btn-sm' onClick={() => deletar(item.id)} > DELETAR </button>
                                    </td>
                                </tr>
                            )
                            )
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default GerenciadorUsuarios;