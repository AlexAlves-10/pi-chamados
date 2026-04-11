'use client'
import { useState, useEffect } from 'react';
import supabase from '../conexao/bancos';

export default function Calendario() {

  const [dataAtual, setDataAtual] = useState(new Date());
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [pedidosPorDia, setPedidosPorDia] = useState({});

  const hoje = new Date();

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  async function buscarPedidos() {
    const { data, error } = await supabase.from('pedidos').select('turno, data');
    if (data && !error) {
      const mapaPedidos = {};
      data.forEach(p => {
        if (!p.data) return;
        const dataFormatada = p.data.split('T')[0];
        
        let turnoNorm = p.turno.toLowerCase();
        if (turnoNorm === 'manhã') turnoNorm = 'manha';

        if (!mapaPedidos[dataFormatada]) {
          mapaPedidos[dataFormatada] = [];
        }
        
        if (!mapaPedidos[dataFormatada].includes(turnoNorm)) {
          mapaPedidos[dataFormatada].push(turnoNorm);
        }
      });
      setPedidosPorDia(mapaPedidos);
    }
  }

  useEffect(() => {
    buscarPedidos();
  }, [dataAtual]);

  function gerarDias() {
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    const dias = [];

    for (let i = 0; i < primeiroDia; i++) {
      dias.push(null);
    }

    for (let i = 1; i <= totalDias; i++) {
      dias.push(new Date(ano, mes, i));
    }

    return dias;
  }

  function mudarMes(valor) {
    const novaData = new Date(dataAtual);
    novaData.setMonth(novaData.getMonth() + valor);
    setDataAtual(novaData);
  }

  const dias = gerarDias();

  return (
    <div className="container mt-5 mb-5 d-flex justify-content-center">
      <div className="glass-card shadow-lg border-0 w-100" style={{ maxWidth: '900px' }}>
        
        {/* Header */}
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-4 border-0" style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}>
          <button onClick={() => mudarMes(-1)} className="btn btn-light btn-sm text-primary fw-bold px-3 py-2 rounded-3 shadow-sm">
            <i className="bi bi-chevron-left me-1"></i> Anterior
          </button>

          <h3 className="m-0 fw-bold text-uppercase" style={{ letterSpacing: '1px' }}>
            {dataAtual.toLocaleString('pt-BR', { month: 'long' })} {dataAtual.getFullYear()}
          </h3>

          <button onClick={() => mudarMes(1)} className="btn btn-light btn-sm text-primary fw-bold px-3 py-2 rounded-3 shadow-sm">
            Próximo <i className="bi bi-chevron-right ms-1"></i>
          </button>
        </div>

        <div className="card-body p-4">
          <div className="d-flex justify-content-center gap-4 mb-4">
            <div className="d-flex align-items-center"><span style={{ color: 'orange', fontSize: '1.2rem' }}>●</span> <span className="ms-1 small fw-medium text-muted">Manhã</span></div>
            <div className="d-flex align-items-center"><span style={{ color: 'red', fontSize: '1.2rem' }}>●</span> <span className="ms-1 small fw-medium text-muted">Tarde</span></div>
            <div className="d-flex align-items-center"><span style={{ color: 'blue', fontSize: '1.2rem' }}>●</span> <span className="ms-1 small fw-medium text-muted">Noite</span></div>
            <div className="d-flex align-items-center"><div style={{ width: '15px', height: '15px', backgroundColor: '#fdf3f4', border: '1px solid #f5c2c7', borderRadius: '3px' }} className="me-1"></div> <span className="small fw-medium text-danger">Dia Cheio</span></div>
          </div>

          {/* Dias da semana */}
          <div style={styles.grid} className="mb-2">
            {diasSemana.map(d => (
              <div key={d} className="text-secondary" style={styles.diaSemana}>{d}</div>
            ))}
          </div>

          {/* Dias */}
          <div style={styles.grid}>
            {dias.map((dia, index) => {

              const ehHoje =
                dia &&
                dia.getDate() === hoje.getDate() &&
                dia.getMonth() === hoje.getMonth() &&
                dia.getFullYear() === hoje.getFullYear();

              const ehSelecionado =
                dataSelecionada &&
                dia &&
                dia.toDateString() === dataSelecionada.toDateString();

              let dataFormatada = null;

              if (dia) {
                // Ajustando timezone issues - Pega a data local e formata YYYY-MM-DD
                const ano = dia.getFullYear();
                const mes = String(dia.getMonth() + 1).padStart(2, '0');
                const d = String(dia.getDate()).padStart(2, '0');
                dataFormatada = `${ano}-${mes}-${d}`;
              }

              const turnos = dataFormatada ? (pedidosPorDia[dataFormatada] || []) : [];
              const diaCheio = turnos.length >= 3;

              let backgroundColor = 'transparent';
              let color = 'var(--text-main)';
              let border = ehHoje ? '2px solid var(--text-primary)' : '1px solid rgba(130, 130, 130, 0.25)';
              let transform = 'none';
              let boxShadow = 'none';
              let fontWeight = 'normal';
              
              if (diaCheio) {
                backgroundColor = 'rgba(220, 53, 69, 0.1)';
                border = '2px solid #dc3545';
                color = '#dc3545';
                fontWeight = 'bold';
              } else if (ehSelecionado) {
                backgroundColor = 'var(--text-primary)';
                color = '#fff';
                border = '1px solid var(--text-primary)';
              } else if (hoverIndex === index && dia) {
                backgroundColor = 'var(--glass-border)';
                transform = 'translateY(-3px)';
                boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
              }

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (!dia) return;

                    setDataSelecionada(dia);

                    // Ajustando timezone issues
                    const ano = dia.getFullYear();
                    const mes = String(dia.getMonth() + 1).padStart(2, '0');
                    const d = String(dia.getDate()).padStart(2, '0');
                    const formated = `${ano}-${mes}-${d}`;

                    window.location.href = `/pedidos?data=${formated}`;
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  style={{
                    ...styles.dia,
                    backgroundColor,
                    color,
                    border,
                    transform,
                    boxShadow,
                    fontWeight,
                    cursor: dia ? 'pointer' : 'default',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <span style={{ zIndex: 2 }}>{dia ? dia.getDate() : ''}</span>
                  
                  {diaCheio && dia && (
                     <div style={{ position: 'absolute', top: '5px', right: '5px', fontSize: '10px', color: '#dc3545' }}>
                       <i className="bi bi-x-circle-fill"></i>
                     </div>
                  )}

                  {/* 🔥 TURNOS */}
                  {dia && (
                    <div style={styles.turnos}>
                      {turnos?.includes('manha') && <span style={{ color: 'orange' }}>●</span>}
                      {turnos?.includes('tarde') && <span style={{ color: 'red' }}>●</span>}
                      {turnos?.includes('noite') && <span style={{ color: 'blue' }}>●</span>}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
    gap: '8px',
    width: '100%'
  },
  diaSemana: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: '10px',
    fontSize: '14px',
    textTransform: 'uppercase'
  },
  dia: {
    position: 'relative',
    aspectRatio: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
  },
  turnos: {
    position: 'absolute',
    bottom: '5px',
    display: 'flex',
    gap: '4px',
    fontSize: '11px',
    zIndex: 2
  }
};