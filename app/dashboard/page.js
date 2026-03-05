import Link from "next/link";


export default function Pedidos() {


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
        <div className="container">

            <h2 className="text-center">Pedidos em aberto 🚨</h2>

<div className="row row-cols-1 row-cols-md-3 g-4">
    {[
        { turno: "MANHÃ", total: 65 },
        { turno: "TARDE", total: 25 },
        { turno: "NOITE", total: 9 },
    ].map((item) => (
        <div className="col" key={item.turno}>
            <div className="card h-100">
                <div className="card-body">
                    <h5 className="card-title">{item.turno}</h5>
                    <p className="card-text">
                        Total de pedidos em aberto: {item.total}
                    </p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-outline-primary w-100">
                        Ver pedidos
                    </button>
                </div>
            </div>
        </div>
    ))}
</div> 


        </div>
    );
}










