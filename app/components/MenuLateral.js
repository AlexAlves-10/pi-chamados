'use client'
import Link from "next/link"
import { useState } from "react"

export default function MenuLateral() {
    const idUsuario = typeof window !== "undefined"
        ? localStorage.getItem("id_usuario")
        : null

    function desconectar() {
        alert("Desconectado com sucesso!")
        localStorage.removeItem("id_usuario")
        localStorage.removeItem("administrador")

        window.location.href = "/"
    }

    if (!idUsuario) return null

    return (
        <div>

            <h4 className="mb-4">Sistema</h4>

            <div className="list-group list-group-flush">
                <Link href="/" className="list-group-item list-group-item-action">Início</Link>
                <Link href="dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link href="gerenciador_usuarios" className="list-group-item list-group-item-action">Usuários</Link>
                <Link href="pedidos" className="list-group-item list-group-item-action">Pedidos</Link>
                <Link href="equipamentos" className="list-group-item list-group-item-action">Equipamentos</Link>
                <Link href="setores" className="list-group-item list-group-item-action">Setores</Link>

                <button onClick={desconectar} type='button' className="btn btn-outline-danger" > Sair da conta </button>
            </div>


        </div>
    )
}