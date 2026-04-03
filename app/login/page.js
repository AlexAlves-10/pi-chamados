// 'use client'
// import { useState } from "react"
// import supabase from "../conexao/bancos";


// function Login() {

//     if(typeof window === "undefined") return null

//     const admin = localStorage.getItem('administrador')
//     const id_usuario = localStorage.getItem("id_usuario")

//     const [email, alteraEmail] = useState("")
//     const [senha, alteraSenha] = useState("")

//     async function autenticar() {

//         const { data, error } = await supabase.auth.signInWithPassword({
//             email: email,
//             password: senha,
//         })

//         if (data.user == null) {
//             alert("Dados inválidos...")
//             return
//         }

//         const { data: usuario, error: erroUsuario } = await supabase
//             .from('usuarios')
//             .select('administrador')
//             .eq('id', data.user.id)
//             .single()

//         if (erroUsuario) {
//             alert('Erro ao buscar usuário')
//             return
//         }

//         localStorage.setItem('id_usuario', data.user.id)
//         localStorage.setItem('administrador', usuario.administrador)


//         alert("Autenticado com sucesso!")

//     }
//     function desconectar() {
//         alert("Desconectado com sucesso!")
//         localStorage.removeItem("id_usuario")
//         localStorage.removeItem("administrador")
//     }


//     return (
//         <div className="row" style={{
//             background: "#c5b5b5",
//             height: "100vh",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//         }}>
//             {
//                 id_usuario == null ?
//                     <div className="card sadow" style={{
//                         width: "350px",
//                         borderRadius: "15px",
//                         padding: "20px",
//                     }}>
//                         <h1 className="text-center mb-4"> Login </h1>
//                         <div className=" mb-3">
//                             <label for="exampleFormControlInput1" className="form-label">Digite seu email</label>
//                             <input className="form-control border-dark" onChange={e => alteraEmail(e.target.value)} />
//                         </div>
//                         <br />

//                         <div>
//                             <label for="exampleFormControlInput1" className="form-label">Digite sua senha</label>
//                             <input type="password" className="form-control border-dark" onChange={e => alteraSenha(e.target.value)} />
//                         </div>

//                         <br />
//                         <br />

//                         <button onClick={autenticar} type='button' className="btn btn-outline-primary" > Entrar </button>
//                     </div>
//                     :
//                     <div className="card shadow" style={{
//                         width: "350px",
//                         borderRadius: "15px",
//                         padding: "20px",
//                     }}>
//                         <p className="text-center"> <strong> Deseja sair? </strong> </p>
//                         <button style={{
//                             borderRadius: "15px",
//                             padding: "20px",
//                         }} onClick={desconectar} type='button' className="btn btn-outline-danger" > Sair da conta </button>
//                     </div>

//             }
//         </div>
//     );
// }

// export default Login;



'use client'
import { useState, useEffect } from "react"
import supabase from "../conexao/bancos";

function Login() {
  // Estado para o id_usuario (controla render)
  const [idUsuario, setIdUsuario] = useState(null)

  // Estados para email e senha (inputs controlados)
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  // Carregar id_usuario do localStorage ao montar o componente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedId = localStorage.getItem("id_usuario")
      setIdUsuario(storedId)
    }
  }, [])

  async function autenticar() {
    if (!email || !senha) {
      alert("Preencha o email e a senha")
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })

      if (error || !data.user) {
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
      setIdUsuario(data.user.id) // Atualiza o estado para re-render

      alert("Autenticado com sucesso!")

    } catch (error) {
      alert("Erro no login: " + error.message)
    }
  }

  function desconectar() {
    localStorage.removeItem("id_usuario")
    localStorage.removeItem("administrador")
    setIdUsuario(null) // Atualiza estado para mostrar formulário
    alert("Desconectado com sucesso!")
  }

  if (typeof window === "undefined") return null

  return (
    <div className="row" style={{
      background: "#c5b5b5",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {!idUsuario ? (
        <div className="card shadow" style={{
          width: "350px",
          borderRadius: "15px",
          padding: "20px",
        }}>
          <h1 className="text-center mb-4"> Login </h1>

          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Digite seu email</label>
            <input
              id="emailInput"
              className="form-control border-dark"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="senhaInput" className="form-label">Digite sua senha</label>
            <input
              id="senhaInput"
              type="password"
              className="form-control border-dark"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button onClick={autenticar} type="button" className="btn btn-outline-primary w-100">
            Entrar
          </button>
        </div>
      ) : (
        <div className="card shadow" style={{
          width: "350px",
          borderRadius: "15px",
          padding: "20px",
        }}>
          <p className="text-center"><strong>Deseja sair?</strong></p>
          <button
            style={{ borderRadius: "15px", padding: "20px" }}
            onClick={desconectar}
            type="button"
            className="btn btn-outline-danger w-100"
          >
            Sair da conta
          </button>
        </div>
      )}
    </div>
  )
}

export default Login