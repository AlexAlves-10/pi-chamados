'use client'

import { useState, useEffect } from 'react'
import supabase from '../conexao/bancos';
import { ToastContainer, toast } from 'react-toastify';

function GerenciadorUsuarios() {

    const [nome, alteraNome] = useState("")
    const [email, alteraEmail] = useState("")
    const [senha, alteraSenha] = useState("")
    const [administrador, alteraAdministrador] = useState(false)
    const [usuarios, alteraUsuarios] = useState([])
    const [editandoId, alteraEditandoId] = useState(null);
    const [pesquisa, alteraPesquisa] = useState("")

    useEffect(() => {
        buscar();
    }, []);

    const listaFiltrada = usuarios.filter(item =>
        (item.nome || "").toLowerCase().includes(pesquisa.toLowerCase()) || (item.email || "").toLowerCase().includes(pesquisa.toLowerCase())
    )

    async function buscar() {
        const promise = supabase
            .from('usuarios').
            select()

        const res = await promise

        if (res.data) {
            alteraUsuarios(res.data)
        } else {
            toast.error("Erro ao buscar")
            console.log(res.error)
        }
    }

    async function salvar() {

        if (!nome || !email || (!editandoId && !senha)) {
            toast.success("Preencha tudo")
            return;
        }

        if (editandoId) {

            const promise = supabase
                .from('usuarios')
                .update({ nome, email, administrador })
                .eq('id', editandoId)

            await toast.promise(promise, {
                pending: "Atualizando usuário...",
                success: "Usuário atualizado!",
                error: "Erro ao atualizar usuário"
            })

            await promise
        } else {

            const promiseCadastro = supabase.auth.signUp({
                email: email,
                password: senha,
            })

            await toast.promise(promiseCadastro, {
                pending: "Cadastrando usuário...",
                success: "Usuário cadastrado!",
                error: "Erro ao cadastrar usuário"
            })

            const res = await promiseCadastro

            if (res.data.user) {
                await supabase
                    .from('usuarios')
                    .insert({
                        id: res.data.user.id,
                        nome: nome,
                        email: email,
                        administrador: administrador
                    })
            }
        }
        toast.success("Salvo!")
        limpar()
        buscar()
    }

    function limpar() {
        alteraNome("")
        alteraEmail("")
        alteraSenha("")
        alteraAdministrador(false)
        alteraEditandoId(null)
    }

    function editar(usuario) {
        alteraNome(usuario.nome)
        alteraEmail(usuario.email)
        alteraAdministrador(usuario.administrador)
        alteraEditandoId(usuario.id)
    }

    async function deletar(id) {
        if (!confirm("Deletar?")) return;

        const promise = supabase
            .from('usuarios')
            .delete()
            .eq('id', id)

        await toast.promise(promise, {
            pending: "Excluindo usuário...",
            success: "Usuário excluído!",
            error: "Erro ao excluir usuário"
        })

        await promise

        buscar()
    }

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" theme="colored" autoClose={3000} />
            <div className="card shadow-sm border-0">

                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                    <h5 className="m-0 fw-bold" style={{ color: '#004a8f' }}>Gestão de Usuários</h5>

                    {/* BOTÃO ADICIONAR - Laranja Senac */}
                    <button
                        className="btn fw-bold shadow-sm"
                        style={{ backgroundColor: '#f26922', color: '#ffffff', borderRadius: '8px' }}
                        data-bs-toggle="modal"
                        data-bs-target="#modalUsuario"
                        onClick={limpar}
                    >
                        ➕ Adicionar Usuário
                    </button>
                </div>

                <div className="card-body">

                    <input
                        className="form-control mb-4 shadow-sm"
                        style={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                        placeholder="🔍 Pesquisar por nome ou email..."
                        value={pesquisa}
                        onChange={e => alteraPesquisa(e.target.value)}
                    />

                    <div className="table-responsive">
                        <table className="table table-hover align-middle">

                            <thead className="table-light">
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Admin</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>

                            <tbody>
                                {listaFiltrada.map(item => (
                                    <tr key={item.id}>
                                        <td className="fw-medium">{item.nome}</td>
                                        <td className="text-muted">{item.email}</td>
                                        <td>
                                            {item.administrador ?
                                                <span className="badge bg-primary rounded-pill">Sim</span> :
                                                <span className="badge bg-secondary rounded-pill">Não</span>
                                            }
                                        </td>

                                        <td className="text-center">
                                            {/* BOTÃO EDITAR - Azul Senac */}
                                            <button
                                                className="btn btn-sm text-white me-2 fw-medium shadow-sm"
                                                style={{ backgroundColor: '#004a8f', borderRadius: '6px' }}
                                                onClick={() => editar(item)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalUsuario"
                                            >
                                                ✏️ Editar
                                            </button>

                                            {/* BOTÃO DELETAR - Outline Vermelho (mais elegante) */}
                                            <button
                                                className="btn btn-outline-danger btn-sm fw-medium shadow-sm"
                                                style={{ borderRadius: '6px' }}
                                                onClick={() => deletar(item.id)}
                                            >
                                                🗑️ Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

            {/* PARTE DO MODAL - Mantida intacta, só dei um tapa no visual dos botões */}
            <div className="modal fade" id="modalUsuario" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow">

                        <div className="modal-header" style={{ backgroundColor: '#004a8f', color: 'white' }}>
                            <h5 className="modal-title fw-bold">
                                {editandoId ? "✏️ Editar Usuário" : "➕ Novo Usuário"}
                            </h5>
                            <button className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body p-4">

                            <label className="form-label text-muted small fw-bold mb-1">Nome Completo</label>
                            <input
                                className="form-control mb-3"
                                placeholder="Ex: João da Silva"
                                value={nome}
                                onChange={e => alteraNome(e.target.value)}
                            />

                            <label className="form-label text-muted small fw-bold mb-1">Email</label>
                            <input
                                className="form-control mb-3"
                                placeholder="joao@email.com"
                                value={email}
                                onChange={e => alteraEmail(e.target.value)}
                            />

                            {!editandoId && (
                                <>
                                    <label className="form-label text-muted small fw-bold mb-1">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control mb-3"
                                        placeholder="••••••••"
                                        value={senha}
                                        onChange={e => alteraSenha(e.target.value)}
                                    />
                                </>
                            )}

                            <label className="form-label text-muted small fw-bold mb-1">Permissão de Acesso</label>
                            <select
                                className="form-select"
                                value={administrador.toString()}
                                onChange={e => alteraAdministrador(e.target.value === "true")}
                            >
                                <option value="false">Usuário Comum</option>
                                <option value="true">Administrador</option>
                            </select>

                        </div>

                        <div className="modal-footer bg-light">
                            <button className="btn btn-outline-secondary fw-medium" data-bs-dismiss="modal">
                                Cancelar
                            </button>

                            <button
                                className="btn text-white fw-bold px-4"
                                style={{ backgroundColor: '#f26922' }}
                                onClick={salvar}
                                data-bs-dismiss="modal"
                            >
                                Salvar Dados
                            </button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default GerenciadorUsuarios;