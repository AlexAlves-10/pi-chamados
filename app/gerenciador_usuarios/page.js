import "./Gerenciador_usuarios.css"

export default function GerenciadorUsuarios() {

    return (
          <div className="container-fluid">
            <div className="row min-vh-100">

                {/* MENU LATERAL */}
                <div className="col-3 bg-dark text-white p-4">
                    <h4 className="mb-4">PAINEL</h4>

                    <div className="list-group list-group-flush">
                        <a className="list-group-item list-group-item-action bg-dark text-white border-0">
                            Dashboard
                        </a>
                        <a className="list-group-item list-group-item-action bg-dark text-white border-0">
                            Usuários
                        </a>
                        <a className="list-group-item list-group-item-action bg-dark text-white border-0">
                            Equipamentos
                        </a>
                    </div>
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className="col-9 p-4 bg-light">
                    <div className="card shadow-sm p-4">
                        <h4 className="mb-4">Lista de Usuários</h4>

                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Usuário</th>
                                    <th>classificação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <button class="btn " type="submit">EDITAR</button>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <button class="btn " type="submit">EDITAR</button>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>@social</td>
                                    <button class="btn " type="submit">EDITAR</button>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>
    );
}








