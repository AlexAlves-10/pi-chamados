'use client'
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from "react";
import "./Equipamentos.css"
import supabase from '../conexao/bancos';

export default function EquipamentosEscola() {

  const [verModal, alteraVerModal] = useState(false);

  const [equipamentos, alteraEquipamentos] = useState([]);
  const [nome, alteraNome] = useState("");
  const [descricao, alteraDescricao] = useState("");
  const [quantidade, alteraQuantidade] = useState()
  const [estoque, alteraEstoque] = useState(true)


  async function buscar() {

    const { data, error } = await supabase
      .from('equipamentos')
      .select()

    console.log(data)
    alteraEquipamentos(data)

  }

  useEffect(() => {
    buscar();
  }, []);

  async function salvar() {

    const objeto = {
      nome: nome,
      descricao: descricao,
      quantidade: quantidade,
      estoque: estoque
    }

    const { error } = await supabase
      .from('equipamentos')
      .insert(objeto)

    if (error == null) {
      alert("Equipamento cadastrado com sucesso!")
      alteraNome("")
      alteraDescricao("")
      alteraQuantidade("")
      alteraEstoque(true)
    } else {
      alert("Dados inválidos, verifique os campos e tente novamente...")
    }

    alteraVerModal(false);

  };

  return (

    <div className="card shadow-sm p-4 mt-3">
      <h3 className="mb-4">Lista de Equipamentos</h3>

      <table className="table table-striped table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Equipamentos</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Estoque</th>
          </tr>
        </thead>

        <tbody>
          {equipamentos.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.descricao}</td>
              <td>{item.quantidade}</td>
              <td>{item.estoque ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>

      </table>

      <div className="text-end mt-3">
        <button
          className="btn btn-success me-2"     
          onClick={() => alteraVerModal(true)}
        >
          Cadastrar
        </button>
        <button
          className="btn btn-warning"
        >
          Editar
        </button>
      </div>

      {verModal && (
        <>
          <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Novo Equipamento</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => alteraVerModal(false)}
                  ></button>
                </div>

                <div className="modal-body">

                  <p>Digite o nome do equipamento</p>
                  <input
                    className="form-control mb-3"
                    value={nome}
                    onChange={(e) => alteraNome(e.target.value)}
                  />

                  <p>Digite a descrição do equipamento</p>
                  <input
                    className="form-control"
                    value={descricao}
                    onChange={(e) => alteraDescricao(e.target.value)}
                  />

                  <p>Digite a quantidade do equipamento</p>
                  <input
                    className="form-control"
                    value={quantidade}
                    onChange={(e) => alteraQuantidade(e.target.value)}
                  />

                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => alteraVerModal(false)}
                  >
                    Fechar
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={salvar}
                  >
                    Salvar
                  </button>
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