import Link from "next/link";
import Login from "../login/page";
import GerenciadorUsuarios from "../gerenciador_usuarios/page";

export default function Pedidos() {
    return (

// TELA DASHBOARD
        <div >

            <h1 className="titulo ">Gerenciamento de pedidos🧾</h1>
            <br />


            <div class="col-0">





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
<br/>
                <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label">Nome de usuario</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>

<label for="exampleFormControlInput1" className="form-label">Selecione o setor</label>
                <select className="form-select" aria-label="Default select example">
                    <option value selected="1"></option>
                    <option value="1">A</option>
                    <option value="1">B</option>
                    <option value="2">C</option>
                    <option value="3">D</option>
                </select>

                <label for="exampleFormControlInput1" className="form-label">Selecione o equipamento</label>
                <select className="form-select" aria-label="Default select example">
                    <option value selected="1"></option>
                    <option value="1">Oculos</option>
                    <option value="1">lousa</option>
                    <option value="2">notebook</option>
                    <option value="3">livro</option>
                </select>


                <label for="exampleFormControlInput1" className="form-label">Selecione a quantidade</label>
                <select className="form-select" aria-label="Default select example">
                    <option value selected="1"></option>
                    <option value="1">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                    <option value="3">4</option>
                </select>

                <label for="exampleFormControlInput1" className="form-label">Selecione o turno</label>
                <select className="form-select" aria-label="Default select example">
                    <option value selected="1"></option>
                    <option value="1">Manhã</option>
                    <option value="1">Tarde</option>
                    <option value="2">Noite</option>
                </select>
                <br />
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-success">Concluir</button>

                </div>


                <h2 className=" text-center">Lista de pedidos🔍</h2>
<br/>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Equipamento</th>
                            <th scope="col">Turno</th>
                            <th scope="col">Concluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>Otto</td>
                            <button type="button" className="btn btn-success">Finalizar</button>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>Otto</td>
                            <button type="button" className="btn btn-success">Finalizar</button>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>Otto</td>
                            <button type="button" className="btn btn-success">Finalizar</button>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>Otto</td>
                            <button type="button" className="btn btn-success">Finalizar</button>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>Otto</td>
                            <button type="button" className="btn btn-success">Finalizar</button>
                        </tr>
                        <tr>
                            <th scope="row">6</th>
                            <td>John</td>
                            <td>Doe</td>
                            <td>Otto</td>
                            <button type="button" className="btn btn-success">Finalizar</button>
                        </tr>
                    </tbody>
                </table>
                <br />
                <br />

            </div>
























        </div>




    )
}