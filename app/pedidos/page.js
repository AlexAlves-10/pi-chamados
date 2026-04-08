'use client'
import { useEffect, useRef, useState } from "react";
import supabase from "../conexao/bancos";
import { ToastContainer, toast } from 'react-toastify';

export default function Pedidos() {

    // STATES
    const [id_usuario, setIdUsuario] = useState("")
    const [id_setor, setIdSetor] = useState("")
    const [id_equipamento, setIdEquipamento] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [turno, setTurno] = useState("")


    const [pedidos, setPedidos] = useState([])
    const [usuarios, setUsuarios] = useState(null)
    const [setores, setSetores] = useState([])
    const [equipamentos, setEquipamentos] = useState([])

    const [editando, setEditando] = useState(null)

    const clicando = useRef(false)

    const equipamentoSelecionado = equipamentos.find(e => e.id == id_equipamento)

    // =========================
    // BUSCAS
    // =========================

    async function buscarPedidos() {

        if (typeof window === "undefined") return

        const admin = localStorage.getItem("administrador") === "true"
        const usuarioLogado = JSON.parse(localStorage.getItem("logado"))

        let query = supabase
            .from("pedidos")
            .select('id, id_usuario(id,nome), id_setor(id,salas), id_equipamento(id,nome,quantidade), quantidade, turno, status')

        if (!admin && usuarioLogado) {
            query = query.eq("id_usuario", usuarioLogado.id)
        }
        const { data } = await query

        if (data) setPedidos(data)
    }

    async function buscarSetores() {
        const { data } = await supabase.from('setores').select('*')
        if (data) setSetores(data)
    }

    async function buscarEquipamentos() {
        const { data } = await supabase.from('equipamentos').select('*')
        if (data) setEquipamentos(data)
    }

    // =========================
    // AÇÕES
    // =========================

    function editar(item) {
        setEditando(item.id)

        setIdUsuario(item.id_usuario?.id || "")

        setIdSetor(
            typeof item.id_setor === "object"
                ? item.id_setor.id
                : item.id_setor
        )

        setIdEquipamento(
            item.id_equipamento?.id ? Number(item.id_equipamento.id) : ""
        )

        setQuantidade(item.quantidade)
        setTurno(item.turno)
    }

    function cancelar() {
        setEditando(null)
        setIdSetor("")
        setIdEquipamento("")
        setQuantidade("")
        setTurno("")
    }

    async function excluir(id) {
        if (!confirm("Tem certeza?")) return

        const promise = supabase
            .from('pedidos')
            .delete()
            .eq('id', id)

        toast.promise(promise, {
            pending: "Excluindo pedido...",
            success: "Pedido excluído!",
            error: "Erro ao excluir pedido"
        })

        await promise

        buscarPedidos()
    }

    async function salvar() {

        if (clicando.current) return
        clicando.current = true

        try {

            const qtd = Number(quantidade)
            const idEquipamentoFinal = Number(id_equipamento)

            if (!id_usuario || !id_setor || !id_equipamento || qtd <= 0) {
                alert("Preencha todos os campos corretamente!")
                return
            }

            const { data: equip } = await supabase
                .from('equipamentos')
                .select('*')
                .eq('id', idEquipamentoFinal)
                .single()

            if (!equip) {
                toast.error("Erro ao buscar equipamento")
                return
            }

            if (qtd > equip.quantidade) {
                alert("Sem estoque!")
                return
            }

            const dados = {
                id_usuario,
                id_setor,
                id_equipamento: idEquipamentoFinal,
                quantidade: qtd,
                turno,
                status: false
            }

            if (editando) {

                const { error } = await supabase
                    .from('pedidos')
                    .update(dados)
                    .eq('id', editando)

                if (error) {
                    toast.error("Erro ao atualizar pedido")
                    return
                } else {
                    toast.success("Pedido atualizado!")
                }

            } else {

                const { error } = await supabase
                    .from('pedidos')
                    .insert(dados)

                if (error) {
                    toast.error("Erro ao cadastrar pedido")
                    return
                } else {
                    toast.success("Pedido cadastrado!")
                }

                await supabase
                    .from('equipamentos')
                    .update({ quantidade: equip.quantidade - qtd })
                    .eq('id', id_equipamento)
            }

            cancelar()
            await buscarPedidos()
            await buscarEquipamentos()

        } finally {
            clicando.current = false
        }
    }

    // =========================
    // INIT
    // =========================

    useEffect(() => {

        const usuarioLogado = localStorage.getItem("logado")

        if (usuarioLogado) {
            const user = JSON.parse(usuarioLogado)
            setUsuarios(user)
            setIdUsuario(user.id)
        }

        buscarPedidos()
        buscarSetores()
        buscarEquipamentos()
    }, [])

    // =========================
    // UI
    // =========================

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" theme="colored" autoClose={3000} />

            <h3>Pedidos</h3>

            <div style={{
                background: "linear-gradient(135deg, #0d6efd, #6610f2)",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: "10px",
                display: "inline-block",
                fontWeight: "500",
                marginBottom: "15px"
            }} >
                <div style={{ fontSize: "20px" }}>  </div>
                <div>
                    <small style={{ color: "#888" }} > Usuário logado </small>
                    {usuarios && (<h5 style={{ margin: 0, fontWeight: "bold" }} ><strong> <i className="bi bi-person-circle"></i> </strong> {usuarios.nome}</h5>)}
                </div>

            </div>

            <select className="form-select mb-2 w-25" value={id_setor} onChange={e => setIdSetor(e.target.value)}>
                <option disabled hidden value="">Setor</option>
                {setores.map(s => (
                    <option key={s.id} value={s.id}>{s.salas}</option>
                ))}
            </select>

            <select className="form-select mb-2 w-25" value={id_equipamento} onChange={e => setIdEquipamento(Number(e.target.value))}>
                <option disabled hidden value="">Equipamento</option>
                {equipamentos.map(e => (
                    <option key={e.id} value={e.id}>{e.nome}</option>
                ))}
            </select>

            <p>Disponível: {equipamentoSelecionado?.quantidade || 0}</p>

            <input
                type="number"
                className="form-control mb-2 w-25"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
            />

            <select className="form-select mb-2 w-25" value={turno} onChange={e => setTurno(e.target.value)}>
                <option disabled hidden value="">Turno</option>
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Noite</option>
            </select>

            <button type="button" className="btn btn-primary" onClick={salvar}>
                {editando ? "Atualizar" : "Salvar"}
            </button>

            {editando && (
                <button className="btn btn-secondary ms-2" onClick={cancelar}>
                    Cancelar
                </button>
            )}

            <hr />
            <div className="my-3 rounded-4 overflow-hidden shadow" >
                <table className="table table-hover table-bordered">
                    <thead className="table-primary" >
                        <tr>
                            <th>Usuário</th>
                            <th>Setor</th>
                            <th>Equipamento</th>
                            <th>Qtd</th>
                            <th>Turno</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(p => (
                            <tr key={p.id}>
                                <td>{p.id_usuario?.nome}</td>
                                <td>{p.id_setor?.salas}</td>
                                <td>{p.id_equipamento?.nome}</td>
                                <td>{p.quantidade}</td>
                                <td>{p.turno}</td>
                                <td>
                                    <button className="btn btn-primary me-2" onClick={() => editar(p)}> <i className="bi bi-pencil-fill"></i> </button>
                                    <button className="btn btn-danger" onClick={() => excluir(p.id)}> <i className="bi bi-trash3-fill"></i> </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}