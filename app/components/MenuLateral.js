'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";
import supabase from "../conexao/bancos";

export default function MenuLateral() {
    const pathname = usePathname();
    const [idUsuario, setIdUsuario] = useState(null);
    const [admin, setAdmin] = useState("false");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const user = localStorage.getItem("id_usuario");
        setIdUsuario(user);
        
        if (user) {
            supabase.from('usuarios').select('administrador').eq('id', user).single().then(({ data }) => {
                if (data) {
                    setAdmin(data.administrador ? "true" : "false");
                }
            });
        }

        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else if (savedTheme === "light") {
            setIsDarkMode(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [pathname])

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
        const promessa = new Promise((resolve) => setTimeout(() => resolve(), 1200))

        toast.promise(promessa, {
            pending: "Saindo...",
            success: "Desconectado com sucesso!",
            error: "Erro ao sair"
        })

        promessa.then(() => {
            localStorage.removeItem("id_usuario")
            localStorage.removeItem("logado")
            window.location.href = "/"
        })
    }

    if (!isClient) return null;
    if (!idUsuario) return null;

    const navLinks = [
        { href: '/', icon: 'bi-house-door-fill', label: 'Inicio' },
        ...(admin === "true" ? [{ href: '/dashboard', icon: 'bi-check2-square', label: 'Dashboard' }] : []),
        { href: '/pedidos', icon: 'bi-card-checklist', label: 'Pedidos' },
        { href: '/calendario', icon: 'bi-calendar3', label: 'Calendário' },
        ...(admin === "true" ? [
            { href: '/equipamentos', icon: 'bi-tools', label: 'Equipamentos' },
            { href: '/setores', icon: 'bi-building', label: 'Setores' },
            { href: '/gerenciador_usuarios', icon: 'bi-people-fill', label: 'Usuários' }
        ] : [])
    ];

    const SidebarContent = () => (
        <>
            <ToastContainer position="top-right" theme={isDarkMode ? "dark" : "colored"} autoClose={3000} />
            
            <div className="sidebar-logo d-flex align-items-center justify-content-center py-4 flex-column">
                {/* Simulated Logo based on image */}
                <i className="bi bi-layers-half logo-icon fs-1 mb-1"></i>
                <h3 className="text-white fw-bold m-0 tracking-wide font-logo">Senac</h3>
            </div>

            <div className="sidebar-menu flex-grow-1 py-3 px-3 overflow-auto">
                <ul className="nav flex-column gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li className="nav-item" key={link.href}>
                                <Link 
                                    href={link.href} 
                                    className={`nav-link sidebar-link rounded-3 px-3 py-2 d-flex align-items-center ${isActive ? 'active' : ''}`}
                                >
                                    <i className={`bi ${link.icon} me-3 fs-5`}></i> 
                                    <span className="fw-medium sidebar-text">{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="sidebar-footer p-3 mt-auto border-top border-secondary border-opacity-25">
                 <button onClick={toggleTheme} className="btn sidebar-btn w-100 d-flex align-items-center mb-2 rounded-3 text-white">
                    <i className={isDarkMode ? "bi bi-sun-fill me-3 fs-5" : "bi bi-moon-fill me-3 fs-5"}></i>
                    <span className="fw-medium sidebar-text">{isDarkMode ? "Modo Claro" : "Modo Escuro"}</span>
                </button>
                 <button onClick={desconectar} className="btn btn-outline-danger sidebar-btn w-100 d-flex align-items-center text-start px-3 py-2 rounded-3">
                    <i className="bi bi-box-arrow-right me-3 fs-5"></i> 
                    <span className="fw-medium text-danger sidebar-text">Sair da conta</span>
                </button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar (Fixed) */}
            <aside className="sidebar desktop-sidebar d-none d-lg-flex flex-column vh-100 bg-sidebar">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar (Offcanvas) */}
            <div className="offcanvas offcanvas-start bg-sidebar" tabIndex="-1" id="sidebarOffcanvas" aria-labelledby="sidebarOffcanvasLabel">
                <div className="offcanvas-header justify-content-end pb-0">
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column p-0">
                    <SidebarContent />
                </div>
            </div>
        </>
    )
}