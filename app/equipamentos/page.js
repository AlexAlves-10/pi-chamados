import "./Equipamentos.css"

export default function Equipamentos() {
    return (


        <div class="container-fluid">
            <div class="row">


                <div class="col-2 menuLateral">
                    <h4 class="mb-4">Sistema</h4>

                    <div class="list-group list-group-flush">
                        <a href="#" class="list-group-item list-group-item-action">Dashboard</a>
                        <a href="#" class="list-group-item list-group-item-action">Usuários</a>
                        <a href="#" class="list-group-item list-group-item-action">Pedidos</a>
                        <a href="#" class="list-group-item list-group-item-action">Equipamentos</a>
                        <a href="#" class="list-group-item list-group-item-action">Calendário</a>
                    </div>
                </div>


                <div class="col-10 conteudo">

                    <div class="card shadow-sm p-4">
                        <h3 class="mb-4">Lista de Equipamentos</h3>

                        <table class="table table-striped table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th>1</th>
                                    <th> Equipamentos </th>
                                    <th> Descrição </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2</td>
                                    <td>Notebook</td>
                                    <td>Notebook Dell Inspiron 15</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Oculos</td>
                                    <td>Óculo Rift 2510</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td> Projetor </td>
                                    <td> Projetor EPSON 415</td>
                                </tr>
                                <tr>
                                    <td> 5 </td>
                                    <td> Headset </td>
                                    <td> Headset Razer </td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="text-end mt-3">
                            <button class="btn btn-success me-2">Cadastrar</button>
                            <button class="btn btn-outline-secondary">Cancelar</button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}