export default function Pedidos() {
    return (
        
                <div class="container-fluid">
                    <div className="row">
                        <h1 className="titulo">Gerenciamento de pedidos🧾</h1>

                        <div className="col- menuLateral ">

                            <div className="text-center">

                            </div>

                            <ul className="list-group my-5 mt-5 ">
                                <div className="list-group">
                                    <a href="#" className="list-group-item list-group-item-action " aria-current="true">Inicio
                                    </a>
                                    <a href="#" className="list-group-item list-group-item-action active">Usuario</a>
                                    <a href="#" className="list-group-item list-group-item-action">Poduto</a>

                                </div>
                            </ul>
                            <div className="text-center">


                                <div className="btn-group dropend">
                                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                                        aria-expanded="false">

                                    </button>
                                    <ul className="dropdown-menu">

                                        <li><a className="dropdown-item" href="#">Editar</a></li>
                                        <li><a className="dropdown-item" href="#">Sair</a></li>


                                    </ul>
                                </div>

                            </div>

                        </div>



                    </div>
                    <div class="col-8">



                        <hr />
                        <h2>Pedidos em aberto(Administrador)</h2>

                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            <div className="col">
                                <div className="card h-100">

                                    <div className="card-body">
                                        <h5 className="card-title">MANHÃ</h5>
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
                                        <h5 className="card-title">TARDE</h5>
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
                                        <h5 className="card-title">NOITE</h5>
                                        <p className="card-text">Total de pedidos em aberto: 9</p>
                                    </div>
                                    <div className="card-footer">
                                        <button select className="form-select form-select-lg mb-3" aria-label="Large select example" ><small className="text-body-secondary">Ver pedidos</small></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <hr />
                        <hr />

                        <h2>Cadastro de novo pedido</h2>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Nome de usuario</label>
                            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                        </div>
                        <label for="exampleFormControlInput1" class="form-label">Selecione o equipamento</label>
                        <select class="form-select" aria-label="Default select example">
                            <option value="1">Oculos</option>
                            <option value="1">lousa</option>
                            <option value="2">notebook</option>
                            <option value="3">livro</option>
                        </select>


                        <label for="exampleFormControlInput1" class="form-label">Selecione a quantidade</label>
                        <select class="form-select" aria-label="Default select example">
                            <option value="1">1</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
                            <option value="3">4</option>
                        </select>

                        <label for="exampleFormControlInput1" class="form-label">Selecione o turno</label>
                        <select class="form-select" aria-label="Default select example">
                            <option value="1">Manhã</option>
                            <option value="1">Tarde</option>
                            <option value="2">Noite</option>
                        </select>
                        <br />
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button class="btn btn-success">Concluir</button>

                        </div>


                        <h2>Pedidos</h2>

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
                                    <button type="button" class="btn btn-success">Finalizar</button>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>Otto</td>
                                    <button type="button" class="btn btn-success">Finalizar</button>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>Otto</td>
                                    <button type="button" class="btn btn-success">Finalizar</button>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>Otto</td>
                                    <button type="button" class="btn btn-success">Finalizar</button>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>Otto</td>
                                    <button type="button" class="btn btn-success">Finalizar</button>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>Otto</td>
                                    <button type="button" class="btn btn-success">Finalizar</button>
                                </tr>
                            </tbody>
                        </table>
                        <hr />
                        <hr />

                    </div>



                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />
                    <hr />




















                </div>
            


        
    )
}