'use client'
import { useState, useEffect } from "react";
import supabase from '../conexao/bancos';

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
      alert("Erro ao concluir pedido.");
    } else {
      // 2. Se deu certo no banco, removemos da lista visual
      const listaAtualizada = listaPedidos.filter(function(pedido) {
        return pedido.id !== idDoPedido;
      });
      alteraListaPedidos(listaAtualizada);
    }
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Pedidos em aberto</h2>

      <div className="row">

        {/* MANHÃ */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-warning text-dark">Manhã</div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Setor</th>
                    <th>Equipamento</th>
                    <th>QTD</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {listaPedidos
                    // Filtra pelo turno (aceita manha, manhã, MANHA, etc)
                    .filter(p => p.turno?.toLowerCase().includes('man'))
                    .map((pedido) => (
                      <tr key={pedido.id}>
                        <td>{pedido.setores?.salas}</td>
                        <td>{pedido.equipamentos?.nome}</td>
                        <td>{pedido.quantidade}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-success" 
                            onClick={() => concluirPedido(pedido.id)}
                          >
                            Concluir
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* TARDE */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-info text-dark">Tarde</div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Setor</th>
                    <th>Equipamento</th>
                    <th>QTD</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {listaPedidos
                    // Filtra pelo turno tarde
                    .filter(p => p.turno?.toLowerCase().includes('tarde'))
                    .map((pedido) => (
                      <tr key={pedido.id}>
                        <td>{pedido.setores?.salas}</td>
                        <td>{pedido.equipamentos?.nome}</td>
                        <td>{pedido.quantidade}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-success" 
                            onClick={() => concluirPedido(pedido.id)}
                          >
                            Concluir
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* NOITE */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-dark text-white">Noite</div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Setor</th>
                    <th>Equipamento</th>
                    <th>QTD</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {listaPedidos
                    // Filtra pelo turno noite
                    .filter(p => p.turno?.toLowerCase().includes('noite'))
                    .map((pedido) => (
                      <tr key={pedido.id}>
                        <td>{pedido.setores?.salas}</td>
                        <td>{pedido.equipamentos?.nome}</td>
                        <td>{pedido.quantidade}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-success" 
                            onClick={() => concluirPedido(pedido.id)}
                          >
                            Concluir
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}