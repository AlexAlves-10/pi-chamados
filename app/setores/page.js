"use client";
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react';
const supabase = createClient('https://ekdskhpbgorgflhhehfp.supabase.co', 'sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ')
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';



export default function Setores() {

    const [salas, alteraSalas] = useState("")
    const [status, alteraStatus] = useState("")

    const [listaTabela, alteraListaTabela] = useState(
        [
            {
                salas: "206",
                status: "Ocupado"
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

    function formataData(data) {
        let data_formatada = new Date(data)
        data_formatada = data_formatada.toLocaleDateString()
        return data_formatada
    }

    function formataHoras(horas) {
        let horas_formatada = new Date(horas)
        horas_formatada = horas_formatada.toLocaleTimeString()
        return horas_formatada
    }

    async function salvar(e) {
        e.preventDefault()

        const objeto = {
            salas: salas,
            status: status === "true"
        }

        const { error } = await supabase
            .from('setores')
            .insert(objeto)

        if (error) {
            console.log(error)
        } else {
            buscar()
        }
    }

    useEffect(() => {
        buscar()
    }, [])

    return (
        <div className="bg-dark text-light min-vh-100" data-bs-theme="dark">

            <div className="row m-0">

                {/* Conteúdo Pricipal */}
                <div className="col-10 mt-4">

                    {/* <!-- Introdução --> */}
                    <div>
                        <h2>Setores</h2>
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

                            <div className="my-3">
                                <table className="table table-dark table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sala</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            listaTabela.map(
                                                (item) =>
                                                    <tr>

                                                        <th scope="row"> {item.salas} </th>
                                                        <td>
                                                            {
                                                                item.status ?
                                                                    <span className='badge text-bg-success' > Livre </span>
                                                                    :
                                                                    <span className="badge text-bg-danger">Ocupado</span>
                                                            }
                                                        </td>
                                                        <td> {formataData(item.criado_em)} às {formataHoras(item.criado_em)} </td>
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

                                    <div>

                                        <label className="form-label w-100">
                                            <div className="col-4">
                                                <select required onChange={e => alteraStatus(e.target.value)} className="form-select">
                                                    <option value="" disabled hidden>FIltros</option>
                                                    <option value="Status" disabled hidden>Status</option>
                                                    <option value="true">Livre</option>
                                                    <option value="false">Ocupado</option>
                                                </select>
                                            </div>
                                        </label>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <button type='submit' className="btn btn-primary">Salvar</button>
                                    <button type='button' className="btn btn-secondary">Cancelar</button>
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

