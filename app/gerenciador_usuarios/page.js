
import "./Gerenciador_usuarios.css";
const listaPedidos = [
    {
        id: 1,
        item: "Caderno",
        usuario: "João Silva",
        quantidade: 2,
        sala: 101
    },
    {
        id: 2,
        item: "Caneta",
        usuario: "Maria Oliveira",
        quantidade: 5,
        sala: 203
    },
    {
        id: 3,
        item: "Livro",
        usuario: "Carlos Mendes",
        quantidade: 1,
        sala: 305
    },
    {
        id: 4,
        item: "Lápis",
        usuario: "Ana Costa",
        quantidade: 10,
        sala: 102
    },
    {
        id: 5,
        item: "Apagador",
        usuario: "Pedro Santos",
        quantidade: 1,
        sala: 210
    }
];

const listaUsuarios = [
    {
        id: 1,
        nome: "João Silva",
        email: "joaosilva@gmail.com",
        status: "admin"
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        email: "maria.oliveira@gmail.com",
        status: "usuario"
    },
    {
        id: 3,
        nome: "Carlos Mendes",
        email: "carlos.mendes@gmail.com",
        status: "usuario"
    },
    {
        id: 4,
        nome: "Ana Costa",
        email: "ana.costa@gmail.com",
        status: "admin"
    },
    {
        id: 5,
        nome: "Pedro Santos",
        email: "pedro.santos@gmail.com",
        status: "usuario"
    }
];

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
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NOME</th>
                                <th scope="col">GMAIL</th>
                                <th scope="col">CLASSIFICAÇÃO</th>
                                <th scope="col" className="text-center">AÇÕES</th>
                            </tr>
                        </thead>

                        <tbody>
                            {listaUsuarios.map(usuario =>
                                <tr>
                                    <td>{usuario.id}</td>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.status}</td>
                                    <td className="text-center">
                                        <button className="btn btn-outline-primary btn-sm">
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            )}
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
                                <th>ID</th>
                                <th>ITEM</th>
                                <th>USUARIOS</th>
                                <th>Qnt</th>
                                <th>SALA</th>
                                
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                              
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



