'use client'
import { useEffect, useState } from "react";
import supabase from "../conexao/bancos";

function Painel() {
    

    if(typeof window === "undefined") return null

    const id_usuario = localStorage.getItem("id_usuario")

    const [ usuario, alteraUsuario ] = useState(null)

    async function buscaUsuario(){

        const { data, error } = await supabase
            .from("usuarios")
            .select()
            .eq("id", id)

        alteraUsuario(data[0])

    }

    useEffect(()=>{
        buscaUsuario()
    },[])

    return (
        <div>
            <h1>Painel do usuário</h1>
            <p>Seja bem-vindo {usuario == null ? "Carregando..." : usuario.nome}</p>

            {
                usuario != null && usuario.admin == true ?
                    <button>Cadastrar novo funcionário</button>
                :
                    <div></div>
            }

        </div>
    );
}

export default Painel;