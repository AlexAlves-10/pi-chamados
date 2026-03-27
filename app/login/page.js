'use client'
import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import supabase from "../conexao/bancos";


function Login() {
    const [autenticado, alteraAutenticado] = useState(false)

    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")

     async function autenticar() {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        if(data.user == null){
            alert("Dados inválidos...")
            return
        }

        alert("Autenticado com sucesso!")
        localStorage.setItem("id_usuario", data.user.id)

    }
    function desconectar() {
        alert("Desconectado com sucesso!")
        localStorage.removeItem("logado")
        alteraAutenticado(false)
    }

    useEffect(() => {
        const logado = localStorage.getItem("logado")
        if (logado == "true") {
            alteraAutenticado(true)
        }
    }, [])


    return (
        <div className="row" >
            {
                autenticado == false ?
                    <div>
                        <h1> Login </h1>
                        <div className=" mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Digite seu email</label>
                            <input className="form-control border-light" onChange={e => alteraEmail(e.target.value)} />
                        </div>
                        <br />

                        <label for="exampleFormControlInput1" className="form-label">Digite sua senha</label>
                        <input type="password" className="form-control border-light" onChange={e => alteraSenha(e.target.value)} />

                        <br />
                        <br />

                        <button onClick={autenticar} type='button' className="btn btn-primary" > Entrar </button>
                    </div>
                :
                    <div>
                        <p> Você já está logado. </p>
                        <button onClick={desconectar} type='button' className="btn btn-danger" > Sair da conta </button>
                    </div>

            }
        </div>
    );
}

export default Login;