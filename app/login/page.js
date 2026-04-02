'use client'
export const dynamic = 'force-dynamic'
import { useState } from "react"
import supabase from "../conexao/bancos";


function Login() {

    const [id_usuario, setIdUsuario] = useState(null)
    const [admin, setAdmin] = useState(null)

    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")

    async function autenticar() {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })

        if (data.user == null) {
            alert("Dados inválidos...")
            return
        }

        const { data: usuario, error: erroUsuario } = await supabase
            .from('usuarios')
            .select('administrador')
            .eq('id', data.user.id)
            .single()

        if (erroUsuario) {
            alert('Erro ao buscar usuário')
            return
        }

        localStorage.setItem('id_usuario', data.user.id)
        localStorage.setItem('administrador', usuario.administrador)


        alert("Autenticado com sucesso!")

    }
    function desconectar() {
        alert("Desconectado com sucesso!")
        localStorage.removeItem("id_usuario")
        localStorage.removeItem("administrador")
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIdUsuario(localStorage.getItem("id_usuario"))
            setAdmin(localStorage.getItem("administrador"))
        }
    }, [])


    return (
        <div className="row" style={{
            background: "#c5b5b5",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            {
                id_usuario == null ?
                    <div className="card sadow" style={{
                        width: "350px",
                        borderRadius: "15px",
                        padding: "20px",
                    }}>
                        <h1 className="text-center mb-4"> Login </h1>
                        <div className=" mb-3">
                            <label for="exampleFormControlInput1" className="form-label">Digite seu email</label>
                            <input className="form-control border-dark" onChange={e => alteraEmail(e.target.value)} />
                        </div>
                        <br />

                        <div>
                            <label for="exampleFormControlInput1" className="form-label">Digite sua senha</label>
                            <input type="password" className="form-control border-dark" onChange={e => alteraSenha(e.target.value)} />
                        </div>

                        <br />
                        <br />

                        <button onClick={autenticar} type='button' className="btn btn-outline-primary" > Entrar </button>
                    </div>
                    :
                    <div className="card shadow" style={{
                        width: "350px",
                        borderRadius: "15px",
                        padding: "20px",
                    }}>
                        <p className="text-center"> <strong> Deseja sair? </strong> </p>
                        <button style={{
                            borderRadius: "15px",
                            padding: "20px",
                        }} onClick={desconectar} type='button' className="btn btn-outline-danger" > Sair da conta </button>
                    </div>

            }
        </div>
    );
}

export default Login;