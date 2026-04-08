'use client'
import Link from "next/link"
import supabase from "../conexao/bancos";
import { ToastContainer, toast } from 'react-toastify';

export default function MenuLateral() {
    const idUsuario = typeof window !== "undefined"
        ? localStorage.getItem("id_usuario")
        : null

    function desconectar() {
        const promessa = new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1200)
        })

        toast.promise(promessa, {
            pending: "Saindo...",
            success: "Desconectado com sucesso!",
            error: "Erro ao sair"
        })

        promessa.then(() => {
            localStorage.removeItem("id_usuario")
            localStorage.removeItem("administrador")
            localStorage.removeItem("logado")

            window.location.href = "/"
        })
        console.log(data)
    }

    if (!idUsuario) return null

    return (
        <div>
            <ToastContainer position="top-right" theme="colored" autoClose={3000} />

            <h4 className="mb-4">Sistema</h4>

            <div className="list-group list-group-flush">
                <Link href="/" className="list-group-item list-group-item-action">Início</Link>

                {localStorage.getItem("administrador") === "true" && (
                    <Link href="dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                )
                }

                {localStorage.getItem("administrador") === "true" && (
                    <Link href="gerenciador_usuarios" className="list-group-item list-group-item-action">Usuários</Link>
                )
                }

                <Link href="pedidos" className="list-group-item list-group-item-action">Pedidos</Link>

                {localStorage.getItem("administrador") === "true" && (
                    <Link href="equipamentos" className="list-group-item list-group-item-action">Equipamentos</Link>
                )
                }

                {localStorage.getItem("administrador") === "true" && (
                    <Link href="setores" className="list-group-item list-group-item-action">Setores</Link>
                )
                }



                <button onClick={desconectar} type='button' className="btn btn-outline-danger" > Sair da conta </button>
            </div>


        </div>
    )
}