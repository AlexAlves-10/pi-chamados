'use client'
import { useState } from "react"
import supabase from "../conexao/bancos";
import 'bootstrap/dist/css/bootstrap.min.css';

function Cadastro() {

    const [senha, alteraSenha] = useState("")
    const [email, alteraEmail] = useState("")
    const [cpf, alteraCPF] = useState("")
    const [nome, alteraNome] = useState("")
    const [endareco, alteraEndareco] = useState("")

    async function cadastro() {
        // CADASTRAR NO AUTHENTICATION DO SUPABASE
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha,
        })

        if (data == null) {
            alert("Dados inálidos?")
            return
        }


        // CADASTRO NA MINHA TABELA DE USUÁRIOS
        const objeto = {
            id: data.user.id,
            nome: nome,
            cpf: cpf,
            endareco: endareco,
        }

        const resposta = await supabase
            .from('usuarios')
            .insert(objeto)

        if (resposta.error == null) {
            alert("Cadatrado com sucesso!")
        } else {
            alert("Varifique os dados novamente")
        }
    }

    return (
        <div style={{
            background: "#c5b5b5",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>

            <div className="card shadow"
                style={{
                    width: "350px",
                    borderRadius: "15px",
                    padding: "20px",
                }}>

                <h1 className="text-center mb-4"> 🧾 Cadastro </h1>

                <div className="mb-3" >
                    <label for="exampleFormControlInput1" className="form-label" > Digite seu nome: <input className="form-control border-dark input-cadastro" onChange={e => alteraSenha(e.target.value)} /> </label>
                </div>

                <div className="mb-3" >
                    <label for="exampleFormControlInput1" className="form-label" > Digite o sua senha: <input className="form-control border-dark input-cadastro" onChange={e => alteraSenha(e.target.value)} /> </label>
                </div>

                <div className="mb-3" >
                    <label for="exampleFormControlInput1" className="form-label" > Digite o email: <input className="form-control border-dark input-cadastro" onChange={e => alteraEmail(e.target.value)} /> </label>
                </div>

                <div className="mb-3" >
                    <label for="exampleFormControlInput1" className="form-label" > Digite o CPF: <input className="form-control border-dark input-cadastro" onChange={e => alteraCPF(e.target.value)} /> </label>
                </div>

                <div className="mb-3" >
                    <label for="exampleFormControlInput1" className="form-label" > Digite o seu endareço: <input className="form-control border-dark input-cadastro" onChange={e => alteraEndareco(e.target.value)} /> </label>
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