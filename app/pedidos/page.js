'use client'
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import 'bootstrap-icons/font/bootstrap-icons.css';

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

    const [ autenticando, alteraAltenticando]= useState(true)

    const equipamentoSelecionado = listaEquipamentos.find(item => item.id == id_equipamento)

    async function buscarPedidos() {
        const { data } = await supabase
            .from("pedidos")
            .select('*, id_usuario(id, nome), id_equipamento(id, nome), id_setor(id, salas)')
        if (data) alteraPedidos(data)
    }

    async function buscarUsuarios() {
        const { data } = await supabase.from('usuarios').select('*')
        alteraListaUsuarios(data || [])
    }

    async function buscarsetores() {
        const { data } = await supabase.from('setores').select('*')
        alteraListasetores(data || [])
    }

    async function buscarEquipamentos() {
        const { data } = await supabase.from('equipamentos').select('*')
        alteraListaEquipamentos(data || [])
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
        alteraIdusuario(""); alteraQuantidade(""); alteraIdsetor(""); alteraIdequipamento(""); alteraTurno("")
    }

    async function excluir(id) {
        if (!confirm("Tem certeza?")) return
        await supabase.from('pedidos').delete().eq('id', id)
        buscarPedidos()
    }

    async function salvar(e) {
        if (e) e.preventDefault()
        const qtd = Number(quantidade)

        if (!id_equipamento || !qtd || !id_usuario) {
            alert("Preencha os campos!")
            return
        }

        const { data: equip } = await supabase.from('equipamentos').select('*').eq('id', id_equipamento).single()

        if (qtd > equip.quantidade) {
            alert("Quantidade maior que o estoque!")
            return
        }

        const objeto = {
            id_usuario,
            id_setor,
            id_equipamento,
            quantidade: qtd,
            turno
        }

     
        const { error } = await supabase.from('pedidos').insert(objeto)

        if (!error) {
        
            await supabase.from('equipamentos').update({ quantidade: equip.quantidade - qtd }).eq('id', id_equipamento)
            alert("Cadastrado!")
            cancelaEdicao()
            buscarPedidos()
            buscarEquipamentos()
        } else {
            alert("Erro: " + error.message)
        }
    }

    async function atualizarAgora() {
        const objeto = { id_usuario, quantidade, id_equipamento, id_setor, turno }
        await supabase.from('pedidos').update(objeto).eq('id', editando)
        cancelaEdicao()
        buscarPedidos()
    }

    useEffect(() => {
        buscarPedidos(); buscarUsuarios(); buscarsetores(); buscarEquipamentos();
    }, [])

    return (
        <div className="container mt-4">
            <h1>Gerenciamento de pedidos</h1>

            <div className="col-4">
                <form className="formulario" onSubmit={editando ? (e) => { e.preventDefault(); atualizarAgora() } : salvar}>
                    <p>Usuario</p>
                    <select className="form-select" disabled={editando != null} value={id_usuario} onChange={e => alteraIdusuario(e.target.value)}>
                        <option value="">Selecione...</option>
                        {listaUsuarios.map(item => <option key={item.id} value={item.id}>{item.nome}</option>)}

                

                    </select>

                    <p>Setor</p>
                    <select className="form-select" value={id_setor} onChange={e => alteraIdsetor(e.target.value)}>
                        <option value="">Selecione...</option>
                        {listasetores.map(item => <option key={item.id} value={item.id}>{item.salas}</option>)}
                    </select>

                    <p>Equipamento</p>
                    <select className="form-select" value={id_equipamento} onChange={e => alteraIdequipamento(e.target.value)}>
                        <option value="">Selecione...</option>
                        {listaEquipamentos.map(item => <option key={item.id} value={item.id}>{item.nome}</option>)}
                    </select>

                    <p>Disponível: {equipamentoSelecionado ? equipamentoSelecionado.quantidade : 0}</p>

                    <p>Quantidade</p>
                    <input type="number" className="form-control" value={quantidade} onChange={e => alteraQuantidade(e.target.value)} />

                    <p>Turno</p>
                    <select className="form-select" value={turno} onChange={e => alteraTurno(e.target.value)}>
                        <option value="">Selecione...</option>
                        <option value="Manhã">Manhã</option>
                        <option value="Tarde">Tarde</option>
                        <option value="Noite">Noite</option>
                    </select>

                    <br />
                    {editando ? (
                        <>
                            <button className="btn btn-warning" type="button" onClick={atualizarAgora}>Atualizar</button>
                            <button className="btn btn-secondary ms-2" type="button" onClick={cancelaEdicao}>Cancelar</button>
                        </>
                    ) : (
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    )}
                </form>
            </div>

            <hr />
            <div className="my-3 shadow">
                <table className="table table-hover table-bordered border-dark">
                    <thead className="table-primary">
                        <tr>
                            <th>Nome</th>
                            <th>Setor</th>
                            <th>Equipamento</th>
                            <th>Qtd</th>
                            <th>Status</th>
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
                                <td>{item.status}</td>
                                <td>{item.turno}</td>
                                <td>
                                    <button className='btn btn-primary me-2' onClick={() => edita(item)}><i className="bi bi-pencil-fill"></i></button>
                                    <button className="btn btn-danger" onClick={() => excluir(item.id)}><i className="bi bi-trash3-fill"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}