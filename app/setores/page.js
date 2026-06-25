"use client";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Paginacao from '../components/Paginacao';
const supabase = createClient('https://ekdskhpbgorgflhhehfp.supabase.co', 'sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ');



export default function Setores() {

    const [editando, alteraEditando] = useState(false)

    const [pesquisa, alteraPesquisa] = useState("")
    const [salas, alteraSalas] = useState("")
    const [listaTabela, alteraListaTabela] = useState([])
    const [usuario, alteraUsuario] = useState(null)

    async function buscar() {
        const { data, error } = await supabase
            .from('setores')
            .select()

        console.log(data)
        alteraListaTabela(data)
    }

    async function salvar(e) {
        e.preventDefault()

        const objeto = {
            salas: salas
        }

        const { error } = await supabase
            .from('setores')
            .insert(objeto)
            .order('setores', { ascending: false })

        if (error) {
            toast.error("Erro ao salvar setor!")
        } else {
            toast.success("Setor salvo com sucesso!")
        }

        const modal = document.getElementById('novoModal')
        const modalBootstrap = bootstrap.Modal.getInstance(modal)
        modalBootstrap.hide()

        buscar()

    }

    async function excluir(id) {
        const opcao = confirm("Tem certe que deseja exluir?")
        if (opcao == false) {
            return
        }
        const response = await supabase.from('setores').delete().eq('id', id)

        buscar()
    }


    function editar(objeto) {

        alteraSalas(objeto.salas)
        alteraEditando(objeto.id)

    }

    function cancelaEdicao() {

        alteraSalas("")
        alteraEditando(null)

    }

    async function atualizar() {

        const objeto = {
            salas: salas
        }

        const { error } = await supabase
            .from('setores')
            .update(objeto)
            .eq('id', editando)

        if (error == null) {
            toast.success("Atualizado com sucesso!")
            cancelaEdicao()
        } else {
            toast.error("Dados inválidos! Verifique os campos e tente novamente...")
        }

        const modal = document.getElementById('editarModal')
        const modalBootstrap = bootstrap.Modal.getInstance(modal)
        modalBootstrap.hide()

        buscar()
    }

    useEffect(() => {
        buscar()
    }, [])

    const listaFiltrada = listaTabela.filter(
        (item) => item.salas.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())
    )

    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 8;
    const indexUltimoItem = paginaAtual * itensPorPagina;
    const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
    const itensAtuais = listaFiltrada.slice(indexPrimeiroItem, indexUltimoItem);

    return (
        <div className="container py-4">
            <ToastContainer position="top-right" theme="colored" autoClose={3000} />
            <div className="glass-card p-4 mx-auto w-100">

                {/* Conteúdo Pricipal */}
                <div className="mt-2">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold text-body m-0"><i className="bi bi-diagram-3 me-3 text-primary"></i>Setores</h2>
                    </div>

                    {/* <!-- Pesquisa e Filtro --> */}
                    <div className="row">
                        <div className="col-8">
                            <div className="input-group mb-3">
                                <input className="form-control" placeholder="Pesquisar" value={pesquisa}
                                    onChange={e => alteraPesquisa(e.target.value)} />
                                <button className="btn btn-outline-secondary">🔎</button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Cadastro --> */}
                    {
                        usuario != null && usuario.administrador == true ? (
                            <button className="btn btn-primary">Cadastrar novo funcionário</button>
                        ) : (
                            <div className='text-end my-3'>
                                <button className="btn btn-primary px-4 shadow-sm" data-bs-toggle="modal" data-bs-target="#novoModal">Novo Setor</button>
                            </div>
                        )
                    }

                    {/* <!-- Tabela de Listagem --> */}
                    <div>

                        {/* <!-- ID,foto,nome --> */}
                        <span>

                            <div className="my-3 rounded-4 overflow-hidden shadow-sm table-responsive-custom">
                                <table className="table table-bordered border-primary table-hover" >
                                    <thead className="table-primary" >
                                        <tr>
                                            <th scope="col">Sala</th>
                                            <th> Ações </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            itensAtuais.map(
                                                (item) =>
                                                    <tr key={item.id}>
                                                        <th scope="row" className="text-wrap" style={{ minWidth: "150px" }}> {item.salas} </th>
                                                        <th className="text-nowrap"> 
                                                            <button data-bs-toggle="modal" data-bs-target="#editarModal" className='btn btn-primary me-2 shadow-sm' onClick={() => editar(item)} > <i className="bi bi-pencil-fill"></i> </button> 
                                                            <button className='btn btn-danger shadow-sm' onClick={() => excluir(item.id)} > <i className="bi bi-trash3-fill"></i> </button> 
                                                        </th>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                                
                                <Paginacao totalItens={listaFiltrada.length} itensPorPagina={itensPorPagina} paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} />
                            </div>
                        </span>

                    </div>
                </div>
            </div>


            {/* <!-- Modals --> */}
            <form onSubmit={salvar}>

                <div>
                    <div className="modal fade" id="novoModal" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5">Cadastro de novo Usuário</h3>
                                    <button type='button' className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label w-100">
                                            Digite a Sala:
                                            <input value={salas} onChange={e => alteraSalas(e.target.value)} className="form-control" />
                                        </label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button onChange={salvar} className="btn btn-primary">Salvar</button>
                                    <button type='button' className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </form>


            <div>
                <div className="modal fade" id="editarModal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fs-5"> Editando Usuário</h3>
                                <button type='button' className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label w-100">
                                        Digite a Sala:
                                        <input value={salas} onChange={e => alteraSalas(e.target.value)} className="form-control" />
                                    </label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={() => atualizar()} type='button' className="btn btn-primary">Atualizar</button>
                                <button onClick={() => cancelaEdicao()} type='button' className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )

}

