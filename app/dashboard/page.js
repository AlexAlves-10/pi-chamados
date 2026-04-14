'use client'
import { useState, useEffect } from "react";
import supabase from "../conexao/bancos";
import { ToastContainer, toast } from 'react-toastify';
import Paginacao from "../components/Paginacao";

export default function Pedidos() {

  const [listaPedidos, alteraListaPedidos] = useState([])

  async function buscaPedidos() {
    // Buscamos TODOS os pedidos (sem filtro pra evitar erro)
    const { data, error } = await supabase
      .from('pedidos')
      .select(`
        *,
        setores (salas),
        equipamentos (nome)
      `)
      .eq('status', false);

    if (error) {
      console.error(error)
    } else {
      alteraListaPedidos(data)
      console.log(data) // debug pra ver se está vindo do banco
    }
  }

  useEffect(() => {
    buscaPedidos()
  }, [])

  async function concluirPedido(idDoPedido) {
    // 1. Atualiza no Banco de Dados para status true (concluído)
    const { error } = await supabase
      .from('pedidos')
      .update({ status: true })
      .eq('id', idDoPedido);

    if (error) {
      console.error("Erro ao atualizar:", error);
      toast.error("Erro ao concluir pedido.");
    } else {
      // 2. Se deu certo no banco, removemos da lista visual
      const listaAtualizada = listaPedidos.filter(function (pedidos) {
        return pedidos.id !== idDoPedido;
      });
      alteraListaPedidos(listaAtualizada);
      toast.success("Pedido concluído com sucesso!");
    }
  }

  const qtdManha = listaPedidos.filter(p => p.turno?.toLowerCase().includes('man')).length;
  const qtdTarde = listaPedidos.filter(p => p.turno?.toLowerCase().includes('tarde')).length;
  const qtdNoite = listaPedidos.filter(p => p.turno?.toLowerCase().includes('noite')).length;

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 5;
  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
  const itensAtuais = listaPedidos.slice(indexPrimeiroItem, indexUltimoItem);

  return (
    <div className="container py-4">
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      
      <div className="d-flex align-items-center mb-4">
        <h2 className="fw-bold text-body m-0"><i className="bi bi-speedometer2 me-3 text-dark"></i>Dashboard Operacional</h2>
      </div>

      {/* KPIs / Cards Superiores */}
      <div className="row g-4 mb-4">
        
        {/* Manhã */}
        <div className="col-12 col-md-4">
            <div className="glass-card p-4 border-bottom border-warning border-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-secondary-custom fw-bold text-uppercase mb-1 tracking-wider" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Demandas da Manhã</h6>
                        <h2 className="mb-0 fw-bold">{qtdManha}</h2>
                    </div>
                    <div className="bg-warning bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px" }}>
                        <i className="bi bi-brightness-alt-high text-warning fs-1"></i>
                    </div>
                </div>
            </div>
        </div>

        {/* Tarde */}
        <div className="col-12 col-md-4">
            <div className="glass-card p-4 border-bottom border-info border-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-secondary-custom fw-bold text-uppercase mb-1 tracking-wider" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Demandas da Tarde</h6>
                        <h2 className="mb-0 fw-bold">{qtdTarde}</h2>
                    </div>
                    <div className="bg-info bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px" }}>
                        <i className="bi bi-brightness-high text-info fs-1"></i>
                    </div>
                </div>
            </div>
        </div>

        {/* Noite */}
        <div className="col-12 col-md-4">
            <div className="glass-card p-4 border-bottom border-dark border-4 h-100">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-secondary-custom fw-bold text-uppercase mb-1 tracking-wider" style={{ letterSpacing: "1px", fontSize: "0.85rem" }}>Demandas da Noite</h6>
                        <h2 className="mb-0 fw-bold">{qtdNoite}</h2>
                    </div>
                    <div className="bg-dark bg-opacity-10 dark-mode-bg-indicator rounded-circle d-flex align-items-center justify-content-center" style={{ width: "64px", height: "64px" }}>
                        <i className="bi bi-moon-stars text-body fs-1"></i>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* Tabela Unificada */}
      <div className="glass-card p-0 overflow-hidden shadow-sm">
          <div className="p-4 border-bottom border-secondary-subtle">
              <h5 className="m-0 fw-bold"><i className="bi bi-list-task me-2"></i>Pedidos em Aberto (Geral)</h5>
          </div>
          <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="ps-4">Turno</th>
                      <th>Setor</th>
                      <th>Equipamento</th>
                      <th className="text-center">Quantidade</th>
                      <th className="text-end pe-4">Ação Rápida</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itensAtuais.map((pedido) => {
                      
                      // Badge logic
                      let badgeClass = "bg-primary";
                      const t = pedido.turno?.toLowerCase() || "";
                      if(t.includes('man')) badgeClass = "bg-warning text-black";
                      if(t.includes('tarde')) badgeClass = "bg-info text-black";
                      if(t.includes('noite')) badgeClass = "bg-dark text-white";

                      return (
                        <tr key={pedido.id}>
                          <td className="ps-4">
                            <span className={`badge ${badgeClass} rounded-pill px-3 py-2 fw-bold`}>
                                {pedido.turno}
                            </span>
                          </td>
                          <td className="fw-medium">{pedido.setores?.salas}</td>
                          <td>{pedido.equipamentos?.nome}</td>
                          <td className="text-center fw-bold fs-5">{pedido.quantidade}</td>
                          <td className="text-end pe-4">
                            <button
                              className="btn btn-sm btn-success fw-bold px-3 shadow-sm rounded-pill d-flex align-items-center ms-auto gap-2"
                              onClick={() => concluirPedido(pedido.id)}
                            >
                              <i className="bi bi-check2-all"></i> Concluir
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                    {listaPedidos.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center text-muted p-5">Nenhum pedido operacional em aberto no momento.</td>
                      </tr>
                    )}
                  </tbody>
              </table>
          </div>
          <div className="p-3 border-top border-secondary-subtle bg-light bg-opacity-50">
              <Paginacao totalItens={listaPedidos.length} itensPorPagina={itensPorPagina} paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} />
          </div>
      </div>
    </div>
  );
}