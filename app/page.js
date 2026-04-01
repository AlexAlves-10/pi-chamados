// "use client";
// import { useState } from "react";

// const turnos = ["manha", "tarde", "noite"];

// export default function Home() {
//   const [dataAtual] = useState(new Date());
//   const [eventos, setEventos] = useState([]);
//   const [selecionado, setSelecionado] = useState(null);
//   const [descricao, setDescricao] = useState("");

//   function abrirModal(data, turno) {
//     setSelecionado({ data, turno });
//     setDescricao("");

//     const modal = new window.bootstrap.Modal(
//       document.getElementById("modalEvento")
//     );
//     modal.show();
//   }

//   function salvarEvento() {
//     if (!descricao) return;

//     const existe = eventos.find(
//       (e) =>
//         e.data === selecionado.data && e.turno === selecionado.turno
//     );

//     if (existe) {
//       alert("Já existe evento nesse turno");
//       return;
//     }

//     setEventos([
//       ...eventos,
//       {
//         data: selecionado.data,
//         turno: selecionado.turno,
//         descricao,
//       },
//     ]);

//     const modal = window.bootstrap.Modal.getInstance(
//       document.getElementById("modalEvento")
//     );
//     modal.hide();
//   }

//   function gerarDiasDoMes() {
//     const ano = dataAtual.getFullYear();
//     const mes = dataAtual.getMonth();
//     const dias = new Date(ano, mes + 1, 0).getDate();

//     let lista = [];
//     for (let i = 1; i <= dias; i++) {
//       lista.push(new Date(ano, mes, i));
//     }
//     return lista;
//   }

//   const dias = gerarDiasDoMes();

//   return (
//     <div className="container mt-4">
//       <h1 className="mb-4">Calendário</h1>

//       <div className="row">
//         {dias.map((dia) => {
//           const dataStr = dia.toLocaleDateString("sv-SE");

//           return (
//             <div key={dataStr} className="col-md-3 col-lg-2 mb-3">
//               <div className="card p-2">
//                 <strong>{dia.getDate()}</strong>

//                 {turnos.map((turno) => {
//                   const evento = eventos.find(
//                     (e) => e.data === dataStr && e.turno === turno
//                   );

//                   return (
//                     <div
//                       key={turno}
//                       className={`mt-2 p-2 text-center rounded ${
//                         evento ? "bg-success text-white" : "bg-light"
//                       }`}
//                       style={{ cursor: "pointer" }}
//                       onClick={() => abrirModal(dataStr, turno)}
//                     >
//                       {turno}: {evento ? evento.descricao : "+"}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* MODAL */}
//       <div
//         className="modal fade"
//         id="modalEvento"
//         tabIndex="-1"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Novo Evento</h5>
//               <button
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//               ></button>
//             </div>

//             <div className="modal-body">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Descrição"
//                 value={descricao}
//                 onChange={(e) => setDescricao(e.target.value)}
//               />
//             </div>

//             <div className="modal-footer">
//               <button
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Cancelar
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={salvarEvento}
//               >
//                 Salvar
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }







"use client";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-3">Sistema de Chamados</h1>

      <p className="lead">
        Gerencie solicitações, acompanhe atendimentos e organize demandas de forma simples e eficiente.
      </p>

      <div className="mt-4">
        <a href="/login" className="btn btn-outline-secondary">
          Acessar Sistema
        </a>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <h5>📌 Registro rápido</h5>
          <p>Abra chamados em poucos cliques.</p>
        </div>

        <div className="col-md-4">
          <h5>📊 Acompanhamento</h5>
          <p>Veja o status dos seus chamados em tempo real.</p>
        </div>

        <div className="col-md-4">
          <h5>⚡ Organização</h5>
          <p>Mantenha tudo centralizado e organizado.</p>
        </div>
      </div>
    </div>
  );
}