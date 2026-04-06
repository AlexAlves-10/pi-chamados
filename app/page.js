"use client";
import { useEffect, useState } from "react"
import supabase from "./conexao/bancos";

export default function Home() {

  if (typeof window === "undefined") return null

  const [id_usuario, setIdUsuario] = useState(null)

  const admin = localStorage.getItem('administrador')

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
      .select('administrador, nome')
      .eq('id', data.user.id)
      .single()

    if (erroUsuario) {
      alert('Erro ao buscar usuário')
      return
    }

    localStorage.setItem('id_usuario', data.user.id)
    localStorage.setItem('administrador', usuario.administrador)

    localStorage.setItem("logado", JSON.stringify({
      id: data.user.id,
      nome: usuario.nome
    }))

    setIdUsuario(data.user.id)

    alert("Autenticado com sucesso!")

    window.location.href = "/"
    console.log(data)
  }
  useEffect(() => {
    const id = localStorage.getItem("id_usuario")
    setIdUsuario(id)
  }, [])
  return (

    <div className="row" style={{
      background: "#f5f5f5",
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
          <div className="container text-center mt-5">
            <h1 className="mb-3">Sistema de Chamados</h1>

            <p className="lead">
              Gerencie solicitações, acompanhe atendimentos e organize demandas de forma simples e eficiente.
            </p>

            <div className="mt-4">
              <a href="/login" className="btn btn-outline-secondary">
                Acessar Sistema
              </a>
            </div>

            <div className="row mt-5">
              <div className="col-md-4">
                <h5>📌 Registro rápido</h5>
                <p>Abra chamados em poucos cliques.</p>
              </div>

              <div className="col-md-4">
                <h5>📊 Acompanhamento</h5>
                <p>Veja o status dos seus chamados em tempo real.</p>
              </div>

              <div className="col-md-4">
                <h5>⚡ Organização</h5>
                <p>Mantenha tudo centralizado e organizado.</p>
              </div>
            </div>
          </div>

      }
    </div>


  );
}