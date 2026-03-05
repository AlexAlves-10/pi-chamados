import "./Equipamentos.css"

export default function equipamentosEscola() {


    const equipamentosEscola = [
  {
    id: 1,
    nome: "Projetor Multimídia",
    descricao: "Equipamento utilizado para projetar imagens e vídeos em salas de aula.",
    disponivelEmEstoque: true
  },
  {
    id: 2,
    nome: "Computador Desktop",
    descricao: "Computador utilizado em laboratórios de informática para atividades educacionais.",
    disponivelEmEstoque: true
  },
  {
    id: 3,
    nome: "Notebook",
    descricao: "Computador portátil utilizado por professores para aulas e apresentações.",
    disponivelEmEstoque: false
  },
  {
    id: 4,
    nome: "Impressora",
    descricao: "Equipamento utilizado para impressão de provas, trabalhos e documentos administrativos.",
    disponivelEmEstoque: true
  },
  {
    id: 5,
    nome: "Quadro Branco",
    descricao: "Superfície utilizada para escrita com marcador em salas de aula.",
    disponivelEmEstoque: true
  },
  {
    id: 6,
    nome: "Caixa de Som",
    descricao: "Equipamento de áudio utilizado para reprodução de som em apresentações e eventos.",
    disponivelEmEstoque: false
  },
  {
    id: 7,
    nome: "Microfone",
    descricao: "Dispositivo utilizado para amplificação de voz em palestras e eventos escolares.",
    disponivelEmEstoque: true
  },
  {
    id: 8,
    nome: "Tablet Educacional",
    descricao: "Dispositivo móvel utilizado por alunos para atividades digitais e interativas.",
    disponivelEmEstoque: false
  },
  {
    id: 9,
    nome: "Roteador Wi-Fi",
    descricao: "Equipamento responsável por fornecer conexão à internet sem fio na escola.",
    disponivelEmEstoque: true
  },
  {
    id: 10,
    nome: "Câmera de Segurança",
    descricao: "Equipamento utilizado para monitoramento das dependências escolares.",
    disponivelEmEstoque: true
  }
];
  

    

    return (

        <div class="card shadow-sm p-4 mt-3">
            <h3 class="mb-4">Lista de Equipamentos</h3>

            <table class="table table-striped table-hover align-middle">
                <thead class="table-light">
                    <tr>
                        <th>ID</th>
                        <th> Equipamentos </th>
                        <th> Descrição </th>
                        <th> Estoque </th>
                    </tr>
                </thead>
                <tbody>

                   { equipamentosEscola.map(
                        item => <tr>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.descricao}</td>
                        <td>{item.disponivelEmEstoque}</td>
                    </tr>
                   )
                   
                   }
                

                   
                </tbody>
            </table>

            <div class="text-end mt-3">
                <button class="btn btn-success me-2">Cadastrar</button>
                <button class="btn btn-outline-secondary">Cancelar</button>
            </div>

        </div>

    )
}