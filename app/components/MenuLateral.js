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
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm custom-gradient-bg py-1 w-100" style={{ backgroundImage: "linear-gradient(90deg, var(--menu-bg-start), var(--menu-bg-end))" }}>
            <ToastContainer position="top-right" theme={isDarkMode ? "dark" : "colored"} autoClose={3000} />
            <div className="container-fluid px-2 px-md-4">
                
                {/* Brand */}
                <Link className="navbar-brand fw-bold d-flex align-items-center" href="/">
                    <i className="bi bi-boxes me-2 fs-4 text-white"></i> 
                    <span className="text-white d-none d-sm-inline fs-5">SENAC Chamados</span>
                    <span className="text-white d-sm-none fs-5">SENAC</span>
                </Link>

                {/* Mobile Toggle Button */}
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCore" aria-controls="navbarCore" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav Links */}
                <div className="collapse navbar-collapse rounded-3 mt-3 mt-lg-0 p-3 p-lg-0" id="navbarCore" style={{ backgroundColor: "rgba(0,0,0,0.1)" }}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1 ms-lg-4 align-items-lg-center">
                        <li className="nav-item">
                            <Link href="/" className="nav-link text-white fw-medium px-3 rounded px-lg-3">Início</Link>
                        </li>

                        {localStorage.getItem("administrador") === "true" && (
                            <li className="nav-item">
                                <Link href="/dashboard" className="nav-link text-white fw-medium px-3 rounded px-lg-3">Dashboard</Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <Link href="/pedidos" className="nav-link text-white fw-medium px-2 rounded px-lg-3">Pedidos</Link>
                        </li>

                        <li className="nav-item">
                            <Link href="/calendario" className="nav-link text-white fw-medium px-2 rounded px-lg-3">Calendário</Link>
                        </li>

                        {localStorage.getItem("administrador") === "true" && (
                            <>
                                <li className="nav-item">
                                    <Link href="/equipamentos" className="nav-link text-white fw-medium px-2 rounded px-lg-3">Equipamentos</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/setores" className="nav-link text-white fw-medium px-2 rounded px-lg-3">Setores</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/gerenciador_usuarios" className="nav-link text-white fw-medium px-2 rounded px-lg-3">Usuários</Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Actions Right */}
                    <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 mt-3 mt-lg-0">
                        <button onClick={toggleTheme} className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2 fw-medium border-0 px-3">
                            {isDarkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-fill"></i>}
                            {isDarkMode ? "Claro" : "Escuro"}
                        </button>
                        
                        <button onClick={desconectar} type='button' className="btn btn-light text-danger fw-bold shadow-sm d-flex align-items-center gap-2 mx-auto ms-lg-2 w-100 w-lg-auto justify-content-center">
                            <i className="bi bi-box-arrow-right"></i> Sair
                        </button>
                    </div>
                </div>

            </div>
        </nav>
    )
}