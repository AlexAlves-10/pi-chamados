'use client'

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'


const supabase = createClient("https://ekdskhpbgorgflhhehfp.supabase.co", "sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ")

export default function Pedidos() {
    const [id_usuario, alteraIdusuario] = useState("")
    const [id_setor, alteraIdsetor] = useState("")
    const [id_equipamento, alteraIdequipamento] = useState("")
    const [quantidade, alteraQuantidade] = useState("")
    const [turno, alteraTurno] = useState("")
    const [pedidos, alteraPedidos] = useState([])

    const [listaUsuarios, alteraListaUsuarios] = useState([])
    const [listasetores, alteraListasetores] = useState([])
    const [listaEquipamentos, alteraListaEquipamentos] = useState([])

    const [editando, alteraEditando] = useState(null)

    //  faz selecao do equipamento selecionado 
    const equipamentoSelecionado = listaEquipamentos.find(
        item => item.id == id_equipamento
    )

    function formataTurno(turno) {
        if (turno == "manhã") {
            return <span className="badge rounded-pill text-bg-primary">Manha</span>
        }
        if (turno == "tarde") {
            return <span className="badge rounded-pill text-bg-danger">Tarde</span>
        }
        if (turno == "noite") {
            return <span className="badge rounded-pill text-bg-warning">Noite</span>
        }
    }

    
    async function buscarPedidos() {
        const { data, error } = await supabase
            .from("pedidos")
            .select('*, id_usuario(id, nome), id_equipamento(id, nome), id_setor(id, salas)')

        if (data) {
            alteraPedidos(data)
        }
    }

    async function buscarUsuarios() {
        const { data } = await supabase.from('usuarios').select('*')
        alteraListaUsuarios(data)
    }

    async function buscarsetores() {
        const { data } = await supabase.from('setores').select('*')
        alteraListasetores(data)
    }

    async function buscarEquipamentos() {
        const { data } = await supabase.from('equipamentos').select('*')
        alteraListaEquipamentos(data)
    }

    function edita(objeto) {
        alteraEditando(objeto.id)
        alteraQuantidade(objeto.quantidade)
        alteraTurno(objeto.turno)

        alteraIdusuario(objeto.id_usuario?.id || "")
        alteraIdsetor(objeto.id_setor?.id || "")
        alteraIdequipamento(objeto.id_equipamento?.id || "")
    }

    function cancelaEdicao() {
        alteraEditando(null)
        alteraIdusuario("")
        alteraQuantidade("")
        alteraIdsetor("")
        alteraIdequipamento("")
        alteraTurno("")
    }

    async function excluir(id) {
        const opcao = confirm("Tem certeza que deseja excluir?")
        if (!opcao) return

        await supabase.from('pedidos')
            .delete()
            .eq('id', id)

        buscarPedidos()
    }

    // mudei aqui para ele salver e ver estoque 
    async function salvar(e) {
        if (e) e.preventDefault()

        const qtd = Number(quantidade)

        //  validação
        if (!id_equipamento || !qtd) {
            alert("Preencha os campos")
            return
        }

        //  busca equipamento atual
        const { data: equipamento } = await supabase
            .from('equipamentos')
            .select('*')
            .eq('id', id_equipamento)
            .single()

        //  valida estoque
        if (qtd > equipamento.quantidade) {
            alert("Quantidade maior que o estoque!")
            return
        }

        //  atualiza estoque
        const novoEstoque = equipamento.quantidade - qtd

        await supabase
            .from('equipamentos')
            .update({ quantidade: novoEstoque })
            .eq('id', id_equipamento)

        //  salva pedido
        const objeto = {
            id_usuario,
            id_setor,
            id_equipamento,
            quantidade: qtd,
            turno,
        }

        const { error } = await supabase.from('pedidos')
        .insert(objeto)

        if (!error) {
            alert("Pedido cadastrado com sucesso!")
            cancelaEdicao()
            buscarPedidos()
            buscarEquipamentos() // atualiza estoque na tela
        } else {
            alert("Erro ao salvar")
        }
    }

    async function atualizarAgora() {
        const objeto = {
            id_usuario,
            quantidade,
            id_equipamento,
            id_setor,
            turno
        }

        const { error } = await supabase
            .from('pedidos')
            .update(objeto)
            .eq('id', editando)

        if (!error) {
            alert("Atualização realizada com sucesso!")
            cancelaEdicao()
            buscarPedidos()
        } else {
            alert("Erro")
        }
    }

    useEffect(() => {
        buscarPedidos()
        buscarUsuarios()
        buscarsetores()
        buscarEquipamentos()
    }, [])

    return (
        <div href="./formulario.css" >
            <h1>Gerenciamento de pedidos</h1>

            <form className="formulario" onSubmit={salvar}>
                <p>Usuario</p>
                <select  disabled={editando != null} value={id_usuario} onChange={e => alteraIdusuario(e.target.value)}>
                    <option value="">Selecione...</option>
                    {listaUsuarios.map(item =>
                        <option value={item.id}>{item.nome}</option>
                    )}
                </select>

                <p>Setor</p>
                <select value={id_setor} onChange={e => alteraIdsetor(e.target.value)}>
                    <option value="">Selecione...</option>
                    {listasetores.map(item =>
                        <option value={item.id}>{item.salas}</option>
                    )}
                </select>

                <p>Equipamento</p>
                <select value={id_equipamento} onChange={e => alteraIdequipamento(e.target.value)}>
                    <option value="">Selecione...</option>
                    {listaEquipamentos.map(item =>
                        <option value={item.id}>{item.nome}</option>
                    )}
                </select>

                {/*  pega a quantidade do equipamentos */}
                <p>
                    Disponível: {equipamentoSelecionado ? equipamentoSelecionado.quantidade : 1}
                </p>

                {/*  */}
                <p>Quantidade</p>
                <input
                    type="number"
                    value={quantidade}
                    max={equipamentoSelecionado?.quantidade || 0}
                    onChange={e => alteraQuantidade(e.target.value)}
                />

                <p>Turno</p>
                <select value={turno} onChange={e => alteraTurno(e.target.value)}>
                    <option value="">Selecione...</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                </select>

                <br /><br />

                {editando != null ? (
                    <>
                        <button onClick={cancelaEdicao}>Cancelar</button>
                        <button onClick={atualizarAgora}>Atualizar</button>
                    </>
                ) : (
                    <button type="submit">Salvar</button>
                )}
            </form>

            <hr />

            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Setor</th>
                        <th>Equipamento</th>
                        <th>Qtd</th>
                        <th>Turno</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map(item => (
                        <tr key={item.id}>
                            <td>{item.id_usuario?.nome}</td>
                            <td>{item.id_setor?.salas}</td>
                            <td>{item.id_equipamento?.nome}</td>
                            <td>{item.quantidade}</td>
                            <td>{item.turno}</td>
                            <td> <button onClick={() => excluir(item.id)}>Excluir</button> 
                                <button onClick={() => edita(item)}>Editar</button> 
                                    </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}