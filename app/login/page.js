'use client'

import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';


function Login() {
    const [autenticado, alteraAutenticado] = useState(false)

    const [usuario, alteraUsuario] = useState("")
    const [senha, alteraSenha] = useState("")

    function autenticar() {

        if (usuario == "admin" && senha == 123123) {
            alert("Você se conectou!")
            localStorage.setItem("logado", true)
            alteraAutenticado(true)
        } else {
            alert("Erro! Algum dado está errado...")
        }
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
        <div  className="row" >
            {
                autenticado == false ?
                    <div>
                        <h1> Login </h1>
                        <div className=" mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Digite seu email</label>
                        <input className="form-control border-light" onChange={e => alteraUsuario(e.target.value)} />
                        </div>
                        <br />

                        <label for="exampleFormControlInput1" class="form-label">Digite sua senha</label>
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