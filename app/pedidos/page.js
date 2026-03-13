
'use client'
import { Coral_Pixels } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
import Login from "../login/page";
import GerenciadorUsuarios from "../gerenciador_usuarios/page";



export default function Pedidos() { 
    const [nome, alteraNome] = useState("")
    const [setor, alteraSetor] = useState("")
    const [equipamento, alteraEquipamento] = useState("")
    const [quantidade, alteraQuantidade] = useState("")
    const [turno, alteraturno] = useState("")
    const [listaPedidos, alteraListaPedidos] = useState(
        [
            {
                nome: "usuario",
                setor: "setor",
                equipamento: "equipamento",
                quantidade: 0,
                turno: "turno",
            },


        ]
    )
    
    function salvar(e) {
        e.preventDefault()
        const objeto = {
            nome: nome,
            setor: setor,
            equipamento: equipamento,
            quantidade: 0,
            turno: turno,
        }

   alteraListaPedidos(listaPedidos.concat(objeto))

    }

    return (

        <div >

       
            <h1 className="titulo ">Gerenciamento de pedidos🧾</h1>
            <br />


            <div className="col-0">

                <h2 className=" text-center">Pedidos em aberto🚨</h2>
                <br />
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100">


                            <div className="card-body">
                                <h5 className="card-title text-center">MANHÃ</h5>
                                <p className="card-text">Total de pedidos em aberto: 65</p>
                            </div>
                            <div className="card-footer">
                                <button select className="form-select form-select-lg mb-3" aria-label="Large select example"><small className="text-body-secondary">Ver pedidos</small></button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">

                            <div className="card-body">
                                <h5 className="card-title text-center">TARDE</h5>
                                <p className="card-text">Total de pedidos em aberto: 25</p>
                            </div>
                            <div className="card-footer">
                                <button select className="form-select form-select-lg mb-3" aria-label="Large select example"><small className="text-body-secondary">Ver pedidos</small></button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">

                            <div className="card-body">
                                <h5 className="card-title text-center">NOITE</h5>
                                <p className="card-text">Total de pedidos em aberto: 9</p>
                            </div>

                            <div className="card-footer">
                                <button select className="form-select form-select-lg mb-3" aria-label="Large select example" ><small className="text-body-secondary">Ver pedidos</small></button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                {/* TELA DE CADASTRO */}
                <h2 className=" text-center">Cadastro de novo pedido💻</h2>
                <br />




                <div> <forms>


                    <div className="mb-3">
                        <label for="exampleFormControlInput1" className="form-label">Digite nome do usuario</label>
                        <input onChange={alteraNome} type="email" className="form-control" />
                    </div>

                    <label for="exampleFormControlInput1" className="form-label">Nome do setor</label>
                    <input onChange={alteraSetor} type="email" className="form-control" />

                    <label for="exampleFormControlInput1" className="form-label">Nome do equipamento</label>
                    <input onChange={alteraEquipamento} type="email" className="form-control" />


                    <label for="exampleFormControlInput1" className="form-label">Digite a quantidade</label>
                    <input onChange={alteraQuantidade} type="email" className="form-control" />

                    <label for="exampleFormControlInput1" className="form-label">Digite o turno</label>
                    <input onChange={alteraturno} type="email" className="form-control" />
                </forms></div>




                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col"> nome  </th>
                            <th scope="col"> setor </th>
                            <th scope="col"> equipamento </th>
                            <th scope="col"> quantidade  </th>
                            <th scope="col"> turno  </th>
                        </tr>
                    </thead>

                    <tbody>
                        {listaPedidos.map(
                            item => <tr>
                                <td>{item.nome}</td>
                                <td>{item.setor}</td>
                                <td>{item.equipamento}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.turno}</td>
                            </tr>
                        )


                        }
                    </tbody>

                </table>























            </div>
</div>



                    ) 
                }