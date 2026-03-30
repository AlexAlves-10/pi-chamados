"use client";
import { useState } from "react";

const turnos = ["Manhã", "Tarde", "Noite"];

export default function Home() {
  const [dataAtual] = useState(new Date());
  const [eventos, setEventos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [descricao, setDescricao] = useState("");

  function abrirModal(data, turno) {
    setSelecionado({ data, turno });
    setDescricao("");

    const modal = new window.bootstrap.Modal(
      document.getElementById("modalEvento")
    );
    modal.show();
  }

  function salvarEvento() {
    if (!descricao) return;

    const existe = eventos.find(
      (e) =>
        e.data === selecionado.data && e.turno === selecionado.turno
    );

    if (existe) {
      alert("Já existe evento nesse turno");
      return;
    }

    setEventos([
      ...eventos,
      {
        data: selecionado.data,
        turno: selecionado.turno,
        descricao,
      },
    ]);

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById("modalEvento")
    );
    modal.hide();
  }

  function gerarDiasDoMes() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();
    const dias = new Date(ano, mes + 1, 0).getDate();

    return Array.from({ length: dias }, (_, i) => new Date(ano, mes, i + 1));
  }

  const dias = gerarDiasDoMes();

  return (
    <div style={{ background: "#f8f9fc", minHeight: "100vh", padding: "30px" }}>
      
      <h2 className="text-center mb-4 fw-semibold">📅 Calendário</h2>

      {/* GRID DOS DIAS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "15px",
        }}
      >
        {dias.map((dia) => {
          const dataStr = dia.toLocaleDateString("sv-SE");

          return (
            <div
              key={dataStr}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {/* DIA */}
              <div className="text-center fw-bold mb-2">
                {dia.getDate()}
              </div>

              {/* TURNOS LADO A LADO */}
              <div style={{ display: "flex", gap: "6px" }}>
                {turnos.map((turno) => {
                  const evento = eventos.find(
                    (e) => e.data === dataStr && e.turno === turno
                  );

                  const icones = {
                    Manhã: "☀",
                    Tarde: "🌇",
                    Noite: "🌙",
                  };

                  return (
                    <div
                      key={turno}
                      onClick={() => abrirModal(dataStr, turno)}
                      style={{
                        flex: "1",
                        padding: "6px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "11px",
                        textAlign: "center",
                        background: evento
                          ? "#d3f9d8"
                          : "#f1f3f5",
                        transition: "0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <div>{icones[turno]}</div>
                      <div style={{ fontWeight: "600" }}>
                        {evento ? evento.descricao : turno}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      <div className="modal fade" id="modalEvento" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content" style={{ borderRadius: "12px" }}>
            
            <div className="modal-header">
              <h5 className="modal-title">Novo Evento</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="Digite a descrição..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-light" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button className="btn btn-dark" onClick={salvarEvento}>
                Salvar
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}