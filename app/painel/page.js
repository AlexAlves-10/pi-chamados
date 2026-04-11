'use client'
import { useEffect, useState } from "react";
import supabase from "../conexao/bancos";

function Painel() {
    
    const [id_usuario, setIdUsuario] = useState(null)
    const [ usuario, alteraUsuario ] = useState(null)

    useEffect(() => {
        if (typeof window !== "undefined") {
            const id = localStorage.getItem("id_usuario")
            setIdUsuario(id)
            if (id) {
                buscaUsuario(id)
            }
        }
    }, [])

    async function buscaUsuario(id){
        const { data, error } = await supabase
            .from("usuarios")
            .select()
            .eq("id", id)

        if (data && data.length > 0) alteraUsuario(data[0])
    }

    if(typeof window === "undefined") return null

    return (
        <div className="container py-5 d-flex justify-content-center">
            <div className="glass-card p-5 text-center" style={{ maxWidth: "600px", width: "100%" }}>
                <h1 className="mb-4 fw-bold text-primary-custom">Painel do Usuário</h1>
                <p className="lead text-secondary-custom">
                    Seja bem-vindo, {usuario == null ? "Carregando..." : <strong className="text-main">{usuario.nome}</strong>}!
                </p>

                {usuario != null && usuario.administrador == true ? (
                    <div className="mt-4">
                        <button className="btn btn-primary px-4 py-2 rounded-pill shadow-sm">Cadastrar novo funcionário</button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Painel;