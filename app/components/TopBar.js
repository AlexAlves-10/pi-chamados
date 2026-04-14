'use client';
import React, { useEffect, useState, useRef } from 'react';

export default function TopBar() {
  const [isClient, setIsClient] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);
  const fileInputRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState("https://ui-avatars.com/api/?name=User&background=f97316&color=fff");

  useEffect(() => {
    setIsClient(true);
    const userId = localStorage.getItem("id_usuario");
    setIdUsuario(userId);

    if (userId) {
        const savedAvatar = localStorage.getItem('userAvatar_' + userId);
        if (savedAvatar) {
            setAvatarUrl(savedAvatar);
        }
    }
  }, []);

  const toggleSidebar = () => {
    document.body.classList.toggle('sidebar-collapsed');
  };

  const handleAvatarClick = () => {
    if(fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setAvatarUrl(base64String);
            localStorage.setItem('userAvatar_' + idUsuario, base64String);
        };
        reader.readAsDataURL(file);
    }
  };

  if (!isClient) return null;

  // Se não houver ID (tela de login inicial limpa), exibe apenas a barra basica para nao quebrar layout, ou renderiza vazio mas mantendo altura
  if (!idUsuario) {
      return <div style={{height: '70px', background: 'linear-gradient(90deg, var(--menu-bg-start) 40%, #002d5c 100%)', width: '100%'}}></div>;
  }

  return (
    <div className="topbar w-100 d-flex justify-content-between align-items-center px-4 flex-shrink-0" 
         style={{ 
             height: '70px', 
             background: 'linear-gradient(90deg, var(--menu-bg-start) 40%, #f97316 100%)', 
             color: 'white', 
             zIndex: 1020 
         }}>
        
        <div className="d-flex align-items-center">
            {/* Botão de abrir/fechar menu p/ desktop */}
            <button className="btn btn-link text-white p-0 me-3 d-none d-lg-block border-0 text-decoration-none shadow-none" onClick={toggleSidebar}>
                <i className="bi bi-list fs-2"></i>
            </button>

            {/* Botão de abrir/fechar menu p/ mobile */}
            <button className="btn btn-link text-white p-0 me-3 d-lg-none border-0 text-decoration-none shadow-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarOffcanvas" aria-controls="sidebarOffcanvas">
                <i className="bi bi-list fs-2"></i>
            </button>
        </div>

        <div className="d-flex align-items-center gap-3">
            <div className="rounded-circle overflow-hidden bg-white ms-2 border border-2 border-white shadow-sm" 
                 style={{width: "40px", height: "40px", cursor: "pointer"}}
                 onClick={handleAvatarClick}
                 title="Alterar Foto de Perfil">
                 <img src={avatarUrl} alt="Perfil" className="w-100 h-100 object-fit-cover" />
                 <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="d-none" />
            </div>
        </div>
    </div>
  );
}
