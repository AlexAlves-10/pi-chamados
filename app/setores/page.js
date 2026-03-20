"use client";
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
const supabase = createClient('https://ekdskhpbgorgflhhehfp.supabase.co', 'sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ')
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';



export default function Setores() {

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
        console.log(error)

    }

    useEffect(() => {
        buscar()
    }, [])

    return (
        <div className="min-vh-100">

            <div className="row m-0">

                {/* Conteúdo Pricipal */}
                <div className="col-10 mt-4">

                    {/* <!-- Introdução --> */}
                    <div>
                        <h2> <strong> Setores </strong> </h2>
                        <hr />
                    </div>

                    {/* <!-- Pesquisa e Filtro --> */}
                    <div className="row">
                        <div className="col-8">
                            <div className="input-group mb-3">
                                <input className="form-control" placeholder="Pesquisar" />
                                <button className="btn btn-outline-secondary">🔎</button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Cadastro --> */}
                    <div className="text-end my-3">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Novo</button>
                    </div>

                    {/* <!-- Tabela de Listagem --> */}
                    <div>

                        {/* <!-- ID,foto,nome --> */}
                        <span>

                            <div className="my-3 rounded-4 overflow-hidden shadow">
                                <table className="table table-hover table-bordered border-dark" >
                                    <thead class="table-primary" >
                                        <tr>
                                            <th scope="col">Sala</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            listaTabela.map(
                                                (item) =>
                                                    <tr>
                                                        <th scope="row"> {item.salas} </th>
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
                    <div className="modal fade" id="exampleModal" tabindex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h3 className="modal-title fs-5">Cadastro de novo usúario</h3>
                                    <button className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label w-100">
                                            Digite a Sala:
                                            <input onChange={e => alteraSalas(e.target.value)} className="form-control" />
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
        </div>
    )

    function Login() {



    }

}

