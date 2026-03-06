"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useState } from 'react';


export default function Setores() {

    const [sala, alteraSala] = useState("")
    const [status, alteraStatus] = useState("")
    const { status2, alteraStatus2 } = useState("")

    const [listaTabela, alteraListaTabela] = useState(
        [
            {
                sala: "206",
                status: "Ocupado",
                status2: "Livre"
            }
        ]

    )

    function salvar(e) {
        e.preventDefault()

        const objeto = {
            sala: sala,
            status: status,
            status2: status2
        }

        alteraListaTabela(listaTabela.concat(objeto))
    }

    return (
        <div className="bg-dark text-light min-vh-100" data-bs-theme="dark">

            {/* Nav bar */}
            <div className="row m-0">
                <nav className='navbar navbar-dark bg-dark'>
                    <div className='container-fluid'>
                        <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#menuLateral">
                            <span className='navbar-toggler-icon'></span>
                        </button>
                    </div>

                </nav>
                {/* Menu lateral */}
                <div className="col-2 menuLateral collapse show bg-black" id="menuLateral">
                    <div className="text-center mt-2">
                        <img className="mt-3 rounded-circle" src="https://placehold.co/75" />
                        <h1 className="fs-5 text">PAINEL</h1>

                    </div>

                    <div className="list-group list-group-flush my-5">
                        <Link href="/" className="list-group-item list-group-item-action">Início</Link>
                        <Link href="gerenciador_usuarios" className="list-group-item list-group-item-action">Usúarios</Link>
                        <Link href="setores" className="list-group-item list-group-item-action">Setores</Link>
                        <Link href="pedidos" className="list-group-item list-group-item-action">Pedidos</Link>
                        <Link href="equipamentos" className="list-group-item list-group-item-action">Equipamentos</Link>
                        <Link href="dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                    </div>

                    <div className="text-center manuLateralPerfil">

                        <img className="rounded-circle" src="https://placehold.co/40" />

                        <div className="btn-group dropend" role="group">
                            <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
                                Perfil
                            </button>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Editar</a></li>
                                <li><a className="dropdown-item" href="#">Sair</a></li>
                            </ul>
                        </div>
                    </div>

                </div>

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

                        <div className="col-4">
                            <select className="form-select">
                                <option value="" disabled hidden>FIltros</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
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
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            listaTabela.map(
                                                item =>
                                                    <tr>
                                                        <th scope="row"> {item.sala} </th>
                                                        <td> {item.status} </td>
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
                                        <input onChange={e => alteraSala(e.target.value)} className="form-control" />
                                    </label>
                                </div>

                                <div>
                                    
                                    <label className="form-label w-100">
                                        <div className="col-4">
                                            <select onChange={e => alteraStatus(e.target.value)} className="form-select">
                                                <option value="" disabled hidden>FIltros</option>
                                                <option value="Status" disabled hidden>Status</option>
                                                <option value="Livre">Livre</option>
                                                <option value="Ocupado">Ocupado</option>
                                            </select>
                                        </div>
                                    </label>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary">Salvar</button>
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

