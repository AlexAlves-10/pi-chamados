'use client'
import Link from "next/link"
import supabase from "../conexao/bancos";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";

export default function MenuLateral() {
    const idUsuario = typeof window !== "undefined"
        ? localStorage.getItem("id_usuario")
        : null

    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme")
        if (savedTheme === "dark") {
            setIsDarkMode(true)
            document.documentElement.setAttribute('data-theme', 'dark')
        } else if (savedTheme === "light") {
            setIsDarkMode(false)
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }, [])

    function toggleTheme() {
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'light')
            localStorage.setItem("theme", "light")
            setIsDarkMode(false)
        } else {
            document.documentElement.setAttribute('data-theme', 'dark')
            localStorage.setItem("theme", "dark")
            setIsDarkMode(true)
        }
    }

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
    }

    if (!idUsuario) return null

    return (
        <div className="menuLateral h-100 d-flex flex-column" style={{ minWidth: "220px" }}>
            <ToastContainer position="top-right" theme={isDarkMode ? "dark" : "colored"} autoClose={3000} />

            <h4 className="mb-4">Sistema</h4>

            <div className="list-group list-group-flush mb-4">
                <Link href="/" className="list-group-item list-group-item-action">Início</Link>

                {localStorage.getItem("administrador") === "true" && (
                    <Link href="/dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                )}

                {localStorage.getItem("administrador") === "true" && (
                    <Link href="/gerenciador_usuarios" className="list-group-item list-group-item-action">Usuários</Link>
                )}

                <Link href="/pedidos" className="list-group-item list-group-item-action">Pedidos</Link>

                {localStorage.getItem("administrador") === "true" && (
                    <Link href="/equipamentos" className="list-group-item list-group-item-action">Equipamentos</Link>
                )}

                {localStorage.getItem("administrador") === "true" && (
                    <Link href="/setores" className="list-group-item list-group-item-action">Setores</Link>
                )}
            </div>

            <div className="d-grid gap-2 mt-auto">
                <button onClick={toggleTheme} className="btn btn-outline-light mb-2 d-flex align-items-center justify-content-center gap-2">
                    {isDarkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-fill"></i>}
                    {isDarkMode ? "Modo Claro" : "Modo Escuro"}
                </button>
                <button onClick={desconectar} type='button' className="btn btn-outline-danger fw-bold" > Sair da conta </button>
            </div>

        </div>
    )
}