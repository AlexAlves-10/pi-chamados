import "./Gerenciador_usuarios.css";

export default function GerenciadorUsuarios() {
    return (
        <div className="col-9 p-4 bg-light">
            {/* CONTEÚDO PRINCIPAL */}
            <div className="card shadow-sm p-4">
                <h4 className="mb-4">Lista de Usuários</h4>

                <table className="table table-striped table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Usuário</th>
                            <th>Classificação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>
                                <button className="btn btn-primary btn-sm">EDITAR</button>
                            </td>
                        </tr>

                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>
                                <button className="btn btn-primary btn-sm">EDITAR</button>
                            </td>
                        </tr>

                        <tr>
                            <td>3</td>
                            <td>John</td>
                            <td>Doe</td>
                            <td>@social</td>
                            <td>
                                <button className="btn btn-primary btn-sm">EDITAR</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}








