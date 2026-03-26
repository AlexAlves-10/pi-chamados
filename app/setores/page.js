"use client";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
const supabase = createClient('https://ekdskhpbgorgflhhehfp.supabase.co', 'sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ');
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';




export default function Setores() {

    const [editando, alteraEditando] = useState(false)

    const [pesquisa, alteraPesquisa] = useState("")
    const [salas, alteraSalas] = useState("")
    const [listaTabela, alteraListaTabela] = useState(

        [
            {
                salas: "206"
            }
        ]

    )

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
        console.log(error)

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
            alert("Atulalizado com sucesso!")
            cancelaEdicao()
        } else {
            alert("Dados inválidos! Verifique os campos e tente novamento...")
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

    return (
        <div className="col-9 p-4 bg-ligh">

            <div className="row m-0 card shadow-sm rounded-3">

                {/* Conteúdo Pricipal */}
                <div className="mt-4">

                    {/* <!-- Introdução --> */}
                    <div>
                        <h2> <strong> Setores </strong> </h2>
                        <hr />
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
                    <div className="text-end my-3">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#novoModal">Novo</button>
                    </div>

                    {/* <!-- Tabela de Listagem --> */}
                    <div>

                        {/* <!-- ID,foto,nome --> */}
                        <span>

                            <div className="my-3 rounded-4 overflow-hidden shadow">
                                <table className="table table-hover table-bordered border-dark" >
                                    <thead className="table-primary" >
                                        <tr>
                                            <th scope="col">Sala</th>
                                            <th> Ações </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            listaFiltrada.map(
                                                (item) =>
                                                    <tr>
                                                        <th scope="row"> {item.salas} </th>
                                                        <th> <button data-bs-toggle="modal" data-bs-target="#editarModal" className='btn btn-primary' onClick={() => editar(item)} > <i class="bi bi-pencil-fill"></i> </button> <button className='btn btn-danger' onClick={() => excluir(item.id)} > <i class="bi bi-trash3-fill"></i> </button> </th>
                                                    </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </span>

                    </div>
                </div>
            </div>


            {/* <!-- Modals --> */}
            <form onSubmit={salvar}>

                <div>
                    <div className="modal fade" id="novoModal" tabindex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5">Cadastro de novo Usuário</h3>
                                    <button className="btn-close" data-bs-dismiss="modal"></button>
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
                <div className="modal fade" id="editarModal" tabindex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title fs-5"> Editando Usuário</h3>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
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

