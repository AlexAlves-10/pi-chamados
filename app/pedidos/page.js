
'use client'
import { Coral_Pixels } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import Login from "../login/page";
import GerenciadorUsuarios from "../gerenciador_usuarios/page";
import { createClient } from '@supabase/supabase-js'
const supabase = createClient("https://ekdskhpbgorgflhhehfp.supabase.co", "sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ")


export default function Pedidos() {
    const [id_usuario, alteraIdusuario] = useState("")
    const [id_setor, alteraIdsetor] = useState("")
    const [id_equipamento, alteraIdequipamento] = useState("")
    const [quantidade, alteraQuantidade] = useState("")
    const [turno, alteraTurno] = useState("")
    const [pedidos, alteraPedidos] = useState([])


    async function buscarPedidos() {
        const { pedidos, error } = await supabase
            .from("pedidos")
            .select()
            console.log(data)
            alteraPedidos(data)
    }
    async function salvar() {
        const objeto = {
            id_usuario: id_usuario,
            id_setor: id_setor,
            id_equipamento: id_equipamento,
            quantidade: quantidade,
            turno: turno
        }
        const { error } = await supabase
            .from('pedidos')

            .insert(objeto)
        console.log(error)

        if (error == null) {
            alert("Pedido cadastrado com sucesso!")
            alteraIdusuario("")
            alteraIdsetor("")
            alteraIdequipamento("")
            alteraQuantidade("")
            alteraTurno("")
        } else {
            alert("Dados invalidos, tente novamente")
        }

       

    }
    useEffect(() => {
        buscarPedidos()
    }, [])

    return (

        <div >




            <h1 className="titulo ">Gerenciamento de pedidos🧾</h1>
            <br />
            <h2 className=" text-center">Cadastro de novo pedido💻</h2>
            <br />




            <div> <form >

                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Digite nome do usuario</label>
                    <input onChange={e => alteraIdusuario(e.target.value)}  className="form-control" />
                </div>

                <label for="exampleFormControlInput1" className="form-label">Nome do setor</label>
                <input onChange={e => alteraIdsetor(e.target.value)}  className="form-control" />

                <label for="exampleFormControlInput1" className="form-label">Nome do equipamento</label>
                <input onChange={e => alteraIdequipamento(e.target.value)}  className="form-control" />


                <label for="exampleFormControlInput1" className="form-label">Digite a quantidade</label>
                <input onChange={e => alteraQuantidade(e.target.value)}  className="form-control" />

                <label for="exampleFormControlInput1" className="form-label">Digite o turno</label>
                <input onChange={e => alteraTurno(e.target.value)}  className="form-control" />
            </form></div>
            <button onClick={salvar}>Salvar</button>



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
                    {pedidos.map(
                        item => <tr>
                            <td>{item.id_usuario}</td>
                            <td>{item.id_setor}</td>
                            <td>{item.id_equipamento}</td>
                            <td>{item.quantidade}</td>
                            <td>{item.turno}</td>
                        </tr>

                    )

                    }
                </tbody>

            </table>




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


            </div>
        </div>



    )
}
