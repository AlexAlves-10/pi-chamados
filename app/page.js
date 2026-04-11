"use client";
import { useEffect, useState } from "react"
import supabase from "./conexao/bancos";
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {

  if (typeof window === "undefined") return null

  const [id_usuario, setIdUsuario] = useState(null)

  const admin = localStorage.getItem('administrador')

  const [email, alteraEmail] = useState("")
  const [senha, alteraSenha] = useState("")

  async function autenticar() {

    const promessaLogin = supabase.auth.signInWithPassword({
      email: email,
      password: senha,
    })

    const { data, error } = await promessaLogin

    if (error) {
      toast.error("Usuário ou senha inválidos")
      return
    }

    if (!data?.user) return

    toast.success("Autenticado com sucesso!")

    const { data: usuario, error: erroUsuario } = await supabase
      .from('usuarios')
      .select('administrador, nome')
      .eq('id', data.user.id)
      .single()

    if (erroUsuario) {
      toast.error("Erro ao buscar usuário")
      return
    }

    localStorage.setItem('id_usuario', data.user.id)
    localStorage.setItem('administrador', usuario.administrador)

    localStorage.setItem("logado", JSON.stringify({
      id: data.user.id,
      nome: usuario.nome
    }))

    setIdUsuario(data.user.id)

    setTimeout(() => {
      window.location.href = "/"
    }, 1500)
    console.log(data)
  }
  
  useEffect(() => {
    const id = localStorage.getItem("id_usuario")
    setIdUsuario(id)
  }, [])

  return (

    <div style={{
      background: "linear-gradient(135deg, #0d6efd, #003366)",
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      {
        id_usuario == null ?
          <div className="card shadow-lg border-0" style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "20px",
            padding: "40px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}>
            <h2 className="text-center mb-4 fw-bold text-primary"> Acesso </h2>
            <p className="text-center text-muted mb-4">Bem-vindo ao Sistema de Chamados</p>
            <div className=" mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label fw-semibold">E-mail</label>
              <input type="email" placeholder="Digite seu e-mail" className="form-control form-control-lg" onChange={e => alteraEmail(e.target.value)} />
            </div>
            
            <div className="mb-4">
              <label htmlFor="exampleFormControlInput2" className="form-label fw-semibold">Senha</label>
              <input type="password" placeholder="Digite sua senha" className="form-control form-control-lg" onChange={e => alteraSenha(e.target.value)} />
            </div>

            <button onClick={autenticar} type='button' className="btn btn-primary btn-lg w-100 rounded-pill fw-bold" > Entrar </button>
          </div>
          :
          <div className="container text-center py-5">
            <div className="card shadow-lg p-5 border-0 mx-auto" style={{ maxWidth: "800px", borderRadius: "20px", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(10px)" }}>
              <h1 className="mb-4 fw-bold text-primary">Sistema de Chamados</h1>

              <p className="lead text-secondary mb-5">
                Gerencie solicitações, acompanhe atendimentos e organize demandas de forma simples e eficiente.
              </p>

              <div className="mb-5">
                <a href="/login" className="btn btn-primary btn-lg rounded-pill fw-bold px-5 shadow-sm">
                  Acessar Painel Principal
                </a>
              </div>

              <div className="row g-4 mt-2">
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded-4 shadow-sm h-100 border border-primary-subtle">
                    <h5 className="fw-bold text-primary"><i className="bi bi-pencil-square me-2"></i>Rápido</h5>
                    <p className="text-muted small mb-0 mt-2">Abra chamados em poucos cliques diretamente do seu celular ou PC.</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-3 bg-light rounded-4 shadow-sm h-100 border border-success-subtle">
                    <h5 className="fw-bold text-success"><i className="bi bi-bar-chart-fill me-2"></i>Ao Vivo</h5>
                    <p className="text-muted small mb-0 mt-2">Veja o status dos seus chamados em tempo real na plataforma.</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="p-3 bg-light rounded-4 shadow-sm h-100 border border-warning-subtle">
                    <h5 className="fw-bold text-warning"><i className="bi bi-collection-fill me-2"></i>Fácil</h5>
                    <p className="text-muted small mb-0 mt-2">Mantenha tudo centralizado e organizado sem perder os detalhes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </div>

  );
}