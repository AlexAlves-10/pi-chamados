'use client'
import { useState } from 'react';

export default function Calendario() {

  const [dataAtual, setDataAtual] = useState(new Date());
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);

  const hoje = new Date();

  // 🔥 DADOS DE EXEMPLO (depois você vai puxar do banco)
  const pedidosPorDia = {
    '2026-04-06': ['manha', 'tarde'],
    '2026-04-07': ['noite'],
  };

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

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
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => mudarMes(-1)} style={styles.btn}>
          <i class="bi bi-chevron-left"></i>
        </button>

        <h2 style={{ margin: 0 }}>
          {dataAtual.toLocaleString('pt-BR', { month: 'long' })} {dataAtual.getFullYear()}
        </h2>

        <button onClick={() => mudarMes(1)} style={styles.btn}>
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Dias da semana */}
      <div style={styles.grid}>
        {diasSemana.map(d => (
          <div key={d} style={styles.diaSemana}>{d}</div>
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

          const dataFormatada = dia
            ? dia.toISOString().split('T')[0]
            : null;

          const turnos = dataFormatada ? pedidosPorDia[dataFormatada] : [];

          return (
            <div
              key={index}
              onClick={() => {
                if (!dia) return;

                setDataSelecionada(dia);

                const dataFormatada = dia.toISOString().split('T')[0];
                window.location.href = `/pedidos?data=${dataFormatada}`;
              }}

              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}

              style={{
                ...styles.dia,

                backgroundColor:
                  ehSelecionado
                    ? '#0d6efd'
                    : hoverIndex === index
                    ? '#0d6efd'
                    : '#fff',

                color:
                  (ehSelecionado || hoverIndex === index)
                    ? '#fff'
                    : '#000',

                border: ehHoje
                  ? '2px solid #198754'
                  : '1px solid #eee',

                cursor: dia ? 'pointer' : 'default'
              }}
            >
              {dia ? dia.getDate() : ''}

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
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '900px',
    margin: '40px auto',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f8f9fa',
    boxSizing: 'border-box'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },

  btn: {
    border: 'none',
    background: '#0d6efd',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
    gap: '3px',
    width: '100%'
  },

  diaSemana: {
    textAlign: 'center',
    fontWeight: 'bold'
  },

  dia: {
    position: 'relative', // 🔥 necessário pros turnos
    aspectRatio: '1 / 1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '5px',
    fontSize: '16px',
    transition: '0.2s'
  },

  turnos: {
    position: 'absolute',
    bottom: '5px',
    display: 'flex',
    gap: '3px',
    fontSize: '10px'
  }
};