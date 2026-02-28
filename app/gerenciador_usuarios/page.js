import "./Gerenciador_usuarios.css";

export default function GerenciadorUsuarios() {
    return (
        <div className="col-9 p-4 bg-light">

            <div className="card shadow-sm rounded-3">

                {/* HEADER USUÁRIOS */}
                <div className="card-header bg-white d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="mb-0 fw-semibold">👤 Lista de Usuários</h5>
                    <button className="btn btn-success btn-sm">
                        + Adicionar Usuário
                    </button>
                </div>

                <div className="card-body">
                    <table className="table table-striped table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Usuário</th>
                                <th>Classificação</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td className="text-center">
                                    <button className="btn btn-outline-primary btn-sm">
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* DIVISOR VISUAL */}
                <hr className="my-0" />

                {/* HEADER PEDIDOS */}
                <div className="card-header bg-white d-flex justify-content-between align-items-center border-bottom">
                    <h5 className="mb-0 fw-semibold">📦 Lista de Pedidos</h5>
                    <button className="btn btn-warning btn-sm">
                        Fazer Pedido
                    </button>
                </div>

                <div className="card-body">
                    <table className="table table-striped table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Pedido</th>
                                <th>Equipamentos</th>
                                <th>Qnt</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>2</td>
                                <td className="text-center">
                                    <button className="btn btn-outline-primary btn-sm">
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}



