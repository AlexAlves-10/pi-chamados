'use client'
import { useState, useEffect } from "react";
import supabase from '../conexao/bancos';

export default function Pedidos() {

  const [listaPedidos, alteraListaPedidos] = useState([])

  async function buscaPedidos() {
    // Buscamos os dados filtrando apenas onde status é falso (não concluído)
    const { data, error } = await supabase
      .from('pedidos')
      .select(`
            *,
            setores!pedidos_id_setor_fkey (salas),
            equipamentos!pedidos_id_equipamento_fkey (nome)
            `)
      .eq('status', false) 

    if (error) {
      console.error(error)
    } else {
      alteraListaPedidos(data)
    }
  }

  useEffect(() => {
    buscaPedidos()
  }, [])

  async function concluirPedido(idDoPedido) {
    // 1. Atualiza no Banco de Dados para status true
    const { error } = await supabase
      .from('pedidos')
      .update({ status: true })
      .eq('id', idDoPedido);

    if (error) {
      console.error("Erro ao atualizar no banco:", error);
      alert("Erro ao concluir pedido no banco de dados.");
    } else {
      // 2. Se deu certo no banco, removemos da lista visual (filtro local)
      const listaAtualizada = listaPedidos.filter(function(pedido) {
        return pedido.id !== idDoPedido;
      });
      alteraListaPedidos(listaAtualizada);
    }
  }

  const pedidosManha = listaPedidos.filter(
    p => p.turno?.toLowerCase() === 'manhã'
  )

  const pedidosTarde = listaPedidos.filter(
    p => p.turno?.toLowerCase() === 'tarde'
  )

  const pedidosNoite = listaPedidos.filter(
    p => p.turno?.toLowerCase() === 'noite'
  )

  return (
    <div className="container">
      <h2 className="text-center mb-4">Pedidos em aberto</h2>

      <div className="row">

    
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              Manhã
            </div>
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
                  {pedidosManha.map((pedido) => (
                    <tr>
                      <td>{pedido.setores?.salas}</td>
                      <td>{pedido.equipamentos?.nome}</td>
                      <td>{pedido.quantidade}</td>
                      <td>
                        <button className="btn btn-sm btn-success" onClick={function() { concluirPedido(pedido.id) }}> Concluir </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

       
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-info text-white">
              Tarde
            </div>
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
                  {pedidosTarde.map((pedido) => (
                    <tr>
                      <td>{pedido.setores?.salas}</td>
                      <td>{pedido.equipamentos?.nome}</td>
                      <td>{pedido.quantidade}</td>
                      <td>
                        <button className="btn btn-sm btn-success" onClick={function() { concluirPedido(pedido.id) }}> Concluir </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>


        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-dark text-white">
              Noite
            </div>
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
                  {pedidosNoite.map((pedido) => (
                    <tr>
                      <td>{pedido.setores?.salas}</td>
                      <td>{pedido.equipamentos?.nome}</td>
                      <td>{pedido.quantidade}</td>
                      <td>
                        <button className="btn btn-sm btn-success" onClick={function() { concluirPedido(pedido.id) }}> 
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