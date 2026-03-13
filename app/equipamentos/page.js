'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from "react";
import "./Equipamentos.css"

const supabase = createClient('https://vjlmxlfucsrezgekhoht.supabase.co', 'sb_publishable_aw8f1-yorX7fd9M5usuImw_0G_bIi8v')

export default function EquipamentosEscola() {

  const [verModal, alteraVerModal] = useState(false);

  // Estados para inputs
  const [nome, alteraNome] = useState("");
  const [descricao, alteraDescricao] = useState("");

  // Lista agora é um estado
  const [equipamentos, alteraEquipamentos] = useState([
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
  ]);

  // Função para salvar novo equipamento
  const salvarEquipamento = () => {

    if (!nome || !descricao) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoEquipamento = {
      id: equipamentos.length + 1,
      nome: nome,
      descricao: descricao,
      disponivelEmEstoque: true
    };

    alteraEquipamentos([...equipamentos, novoEquipamento]);

    // limpar campos
    alteraNome("");
    alteraDescricao("");

    // fechar modal
    alteraVerModal(false);
  };

  return (

  <div className="card shadow-sm p-4 mt-3">
    <h3 className="mb-4">Lista de Equipamentos</h3>

    {/* Tabela */}
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
        {equipamentos.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.descricao}</td>
            <td>
              {item.disponivelEmEstoque}
            </td>
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
                  onClick={salvarEquipamento}
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
