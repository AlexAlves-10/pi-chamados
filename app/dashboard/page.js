'use client'
import { useState, useEffect } from "react";
import supabase from '../conexao/bancos';

export default function Pedidos() {

  const [listaPedidos, alteraListaPedidos] = useState([])

  async function buscaPedidos() {
    const { data, error } = await supabase
      .from('pedidos')
      .select(`*`)

    if (error) {
      console.error(error)
    } else {
      alteraListaPedidos(data)
    }
  }

  useEffect(() => {
    buscaPedidos()
  }, [])

  // Separação por turno
  const pedidosManha = listaPedidos.filter(p => p.turno === 'Manhã')
  const pedidosTarde = listaPedidos.filter(p => p.turno === 'Tarde')
  const pedidosNoite = listaPedidos.filter(p => p.turno === 'Noite')

  return (
    <div className="container">
      <h2 className="text-center mb-4">Pedidos em aberto </h2>

      <div className="row">

        {/* MANHÃ */}
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
                  </tr>
                </thead>
                <tbody>
                  {pedidosManha.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>{pedido.id_setor}</td>
                      <td>{pedido.id_equipamentos}</td>
                      <td>{pedido.quantidade}</td>
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
                  </tr>
                </thead>
                <tbody>
                  {pedidosTarde.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>{pedido.id_setor}</td>
                      <td>{pedido.id_equipamento}</td>
                      <td>{pedido.quantidade}</td>
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
                  </tr>
                </thead>
                <tbody>
                  {pedidosNoite.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>{pedido.id_setor}</td>
                      <td>{pedido.id_equipamento}</td>
                      <td>{pedido.quantidade}</td>
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