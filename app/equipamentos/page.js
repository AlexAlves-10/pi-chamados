'use client'
import { useState } from "react";
import "./Equipamentos.css"

export default function equipamentosEscola() {

  const [showModal, setShowModal] = useState(false);

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

  <div className="card shadow-sm p-4 mt-3">
    <h3 className="mb-4">Lista de Equipamentos</h3>

    {/* Tabela de Equipamentos */}
    <table className="table table-striped table-hover align-middle">
      <thead className="table-light">
        <tr>
          <th>ID</th>
          <th>Equipamentos</th>
          <th>Descrição</th>
          <th>Estoque</th>
        </tr>
      </thead>
      <tbody>
        {equipamentosEscola.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.descricao}</td>
            <td>{item.disponivelEmEstoque}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="text-end mt-3">
      {/* 1. FUNÇÃO NO CLIQUE DO BOTÃO */}
      <button className="btn btn-success me-2" onClick={() => setShowModal(true)}>
        Cadastrar
      </button>
    </div>

    
    {showModal && (
      <>
       
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Novo Equipamento</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Digite o nome do equipamento</p>
                <input></input>
                <p>Digite a descrição do equipamento</p>
                <input></input>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Fechar
                </button>
                <button type="button" className="btn btn-primary">Salvar</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>
    )}
  </div>
  )
}









// 'use client'
// import { useState } from "react";
// import "./Equipamentos.css"

// export default function equipamentosEscola() {

//   const [showModal, setShowModal] = useState(false);
  
//   // Estados para capturar os dados dos novos inputs
//   const [nome, setNome] = useState("");
//   const [descricao, setDescricao] = useState("");

//   // A lista original agora dentro de um estado para permitir a adição de novos itens
//   const [equipamentosEscola, setEquipamentosEscola] = useState([
//     {
//       id: 1,
//       nome: "Projetor Multimídia",
//       descricao: "Equipamento utilizado para projetar imagens e vídeos em salas de aula.",
//       disponivelEmEstoque: true
//     },
//     {
//       id: 2,
//       nome: "Computador Desktop",
//       descricao: "Computador utilizado em laboratórios de informática para atividades educacionais.",
//       disponivelEmEstoque: true
//     },
//     {
//       id: 3,
//       nome: "Notebook",
//       descricao: "Computador portátil utilizado por professores para aulas e apresentações.",
//       disponivelEmEstoque: false
//     },
//     {
//       id: 4,
//       nome: "Impressora",
//       descricao: "Equipamento utilizado para impressão de provas, trabalhos e documentos administrativos.",
//       disponivelEmEstoque: true
//     },
//     {
//       id: 5,
//       nome: "Quadro Branco",
//       descricao: "Superfície utilizada para escrita com marcador em salas de aula.",
//       disponivelEmEstoque: true
//     },
//     {
//       id: 6,
//       nome: "Caixa de Som",
//       descricao: "Equipamento de áudio utilizado para reprodução de som em apresentações e eventos.",
//       disponivelEmEstoque: false
//     },
//     {
//       id: 7,
//       nome: "Microfone",
//       descricao: "Dispositivo utilizado para amplificação de voz em palestras e eventos escolares.",
//       disponivelEmEstoque: true
//     },
//     {
//       id: 8,
//       nome: "Tablet Educacional",
//       descricao: "Dispositivo móvel utilizado por alunos para atividades digitais e interativas.",
//       disponivelEmEstoque: false
//     },
//     {
//       id: 9,
//       nome: "Roteador Wi-Fi",
//       descricao: "Equipamento responsável por fornecer conexão à internet sem fio na escola.",
//       disponivelEmEstoque: true
//     },
//     {
//       id: 10,
//       nome: "Câmera de Segurança",
//       descricao: "Equipamento utilizado para monitoramento das dependências escolares.",
//       disponivelEmEstoque: true
//     }
//   ]);

//   // Função para salvar o que foi digitado
//   const salvarEquipamento = () => {
//     const novoItem = {
//       id: equipamentosEscola.length + 1,
//       nome: nome,
//       descricao: descricao,
//       disponivelEmEstoque: true
//     };

//     // Atualiza a lista e fecha a modal
//     setEquipamentosEscola([...equipamentosEscola, novoItem]);
//     setShowModal(false);
    
//     // Limpa os campos para o próximo cadastro
//     setNome("");
//     setDescricao("");
//   };

//   return (
//     <div className="card shadow-sm p-4 mt-3">
//       <h3 className="mb-4">Lista de Equipamentos</h3>

//       <table className="table table-striped table-hover align-middle">
//         <thead className="table-light">
//           <tr>
//             <th>ID</th>
//             <th>Equipamentos</th>
//             <th>Descrição</th>
//             <th>Estoque</th>
//           </tr>
//         </thead>
//         <tbody>
//           {equipamentosEscola.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>{item.nome}</td>
//               <td>{item.descricao}</td>
//               <td>{item.disponivelEmEstoque ? "Sim" : "Não"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="text-end mt-3">
//         <button className="btn btn-success me-2" onClick={() => setShowModal(true)}>
//           Cadastrar
//         </button>
//       </div>

//       {showModal && (
//         <>
//           <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Novo Equipamento</h5>
//                   <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
//                 </div>
//                 <div className="modal-body">
//                   <p>Digite o nome do equipamento</p>
//                   <input 
//                     className="form-control mb-3" 
//                     value={nome} 
//                     onChange={(e) => setNome(e.target.value)} 
//                   />
//                   <p>Digite a descrição do equipamento</p>
//                   <input 
//                     className="form-control" 
//                     value={descricao} 
//                     onChange={(e) => setDescricao(e.target.value)} 
//                   />
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
//                     Fechar
//                   </button>
//                   <button type="button" className="btn btn-primary" onClick={salvarEquipamento}>
//                     Salvar
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="modal-backdrop fade show"></div>
//         </>
//       )}
//     </div>
//   );
// }