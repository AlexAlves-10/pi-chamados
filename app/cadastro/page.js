'use client'
import { useState } from "react"
import supabase from "../conexao/bancos";
import { ToastContainer, toast } from 'react-toastify';

function Cadastro() {

    const [senha, alteraSenha] = useState("")
    const [email, alteraEmail] = useState("")
    const [nome,alteraNome] = useState("")

    async function cadastro() {
        // CADASTRAR NO AUTHENTICATION DO SUPABASE
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha,
        })

        if (data == null) {
            toast.error("Dados inválidos!")
            return
        }

        // CADASTRO NA MINHA TABELA DE USUÁRIOS
        const objeto = {
            id: data.user.id,
            nome: nome,
            email: email
        }

        const resposta = await supabase
            .from('usuarios')
            .insert(objeto)

        if (resposta.error == null) {
            toast.success("Cadastrado com sucesso!")
            alteraNome("")
            alteraEmail("")
            alteraSenha("")
        } else {
            toast.error("Verifique os dados novamente")
        }
    }

    return (
        <div style={{
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px"
        }}>
            <ToastContainer position="top-right" theme="colored" autoClose={3000} />

            <div className="glass-card shadow px-4 py-5 text-center"
                style={{
                    width: "100%",
                    maxWidth: "350px"
                }}>

                <h1 className="text-center mb-4 text-body fw-bold"><i className="bi bi-person-plus-fill me-3 text-primary"></i>Cadastro</h1>

                <div className="mb-3" >
                    <label for="exampleFormControlInput1" className="form-label" > Digite seu nome: <input className="form-control border-dark input-cadastro" onChange={e => alteraNome(e.target.value)} /> </label>
                </div>

                <div className="mb-3" >
                    <label for="exampleFormControlInput1" className="form-label" > Digite o sua senha: <input className="form-control border-dark input-cadastro" onChange={e => alteraSenha(e.target.value)} /> </label>
                </div>

                <div className="mb-3" >
                    <label for="exampleFormControlInput1" className="form-label" > Digite o email: <input className="form-control border-dark input-cadastro" onChange={e => alteraEmail(e.target.value)} /> </label>
                </div>

                <button type="button" className="btn btn-outline-primary w-100 shadow"
                    style={{
                        width: "350px",
                        borderRadius: "15px",
                        padding: "20px",
                    }} onClick={cadastro} > Cadastrar
                </button>
            </div>


        </div>
    );
}

export default Cadastro;