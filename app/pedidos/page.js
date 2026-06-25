'use client'
import { useEffect, useRef, useState } from "react";
import supabase from "../conexao/bancos";
import { ToastContainer, toast } from 'react-toastify';
import Paginacao from '../components/Paginacao';

export default function Pedidos() {

    // STATES
    const [id_usuario, setIdUsuario] = useState("")
    const [id_setor, setIdSetor] = useState("")
    const [id_equipamento, setIdEquipamento] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [turno, setTurno] = useState("")
    const [dataPedido, setDataPedido] = useState("")


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

    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 8;
    const indexUltimoItem = paginaAtual * itensPorPagina;
    const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
    const itensAtuais = pedidos.slice(indexPrimeiroItem, indexUltimoItem);

    async function buscarPedidos() {

        if (typeof window === "undefined") return

        const usuarioLogado = JSON.parse(localStorage.getItem("logado"))
        
        let isAdmin = false;
        if (usuarioLogado) {
             const { data } = await supabase.from('usuarios').select('administrador').eq('id', usuarioLogado.id).single();
             isAdmin = data?.administrador || false;
        }

        let query = supabase
            .from("pedidos")
            .select('id, id_usuario(id,nome), id_setor(id,salas), id_equipamento(id,nome,quantidade), quantidade, turno, data_agendada, status')

        // Filtro de Segurança
        if (!isAdmin && usuarioLogado) {
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
        setDataPedido(item.data_agendada || "")
    }

    function cancelar() {
        setEditando(null)
        setIdSetor("")
        setIdEquipamento("")
        setQuantidade("")
        setTurno("")
        setDataPedido("")
    }

    async function excluir(id) {
        if (!confirm("Tem certeza?")) return

        // Buscar o pedido antes para saber a qual equipamento pertence
        const { data: pedidoParaExcluir } = await supabase
            .from('pedidos')
            .select('id_equipamento, quantidade')
            .eq('id', id)
            .single()

        const promise = supabase
            .from('pedidos')
            .delete()
            .eq('id', id)

        toast.promise(promise, {
            pending: "Excluindo pedido...",
            success: "Pedido excluído!",
            error: "Erro ao excluir pedido"
        })

        const { error } = await promise

        if (!error && pedidoParaExcluir?.id_equipamento) {
            const { data: equip } = await supabase
                .from('equipamentos')
                .select('quantidade')
                .eq('id', pedidoParaExcluir.id_equipamento)
                .single()
            
            if (equip) {
                await supabase
                    .from('equipamentos')
                    .update({ quantidade: equip.quantidade + pedidoParaExcluir.quantidade })
                    .eq('id', pedidoParaExcluir.id_equipamento)
                
                buscarEquipamentos()
            }
        }

        buscarPedidos()
    }

    async function salvar() {

        if (clicando.current) return
        clicando.current = true

        try {

            const qtd = Number(quantidade)
            const idEquipamentoFinal = Number(id_equipamento)

            if (!id_usuario || !id_setor || !id_equipamento || qtd <= 0 || !turno || !dataPedido || dataPedido.trim() === "") {
                toast.error("Preencha todos os campos corretamente!")
                return
            }

            // Barreira de Turnos Duplicados e Dia Lotado
            const { data: turnosNoDia } = await supabase
                .from('pedidos')
                .select('id, turno')
                .eq('data_agendada', dataPedido)
                
            if (turnosNoDia) {
                const turnosValidos = editando ? turnosNoDia.filter(p => p.id !== editando) : turnosNoDia;
                
                if (turnosValidos.some(p => p.turno.toLowerCase() === turno.toLowerCase())) {
                    toast.error(`O turno da ${turno} já está reservado neste dia!`);
                    return;
                }
                
                if (turnosValidos.length >= 3) {
                    toast.error("Este dia já está completamente lotado (3/3)!");
                    return;
                }
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
                id_setor: Number(id_setor),
                id_equipamento: idEquipamentoFinal,
                quantidade: qtd,
                turno,
                data_agendada: dataPedido,
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
                    console.error("Erro ao cadastrar pedido:", error);
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

        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const dataParam = params.get("data");
            if (dataParam) setDataPedido(dataParam);
        }
    }, [])

    // =========================
    // UI
    // =========================

    return (
        <div className="container mt-5 mb-5">
            <ToastContainer position="top-right" theme="colored" autoClose={3000} />

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold text-body m-0"><i className="bi bi-box-seam me-3 text-dark"></i>Pedidos</h2>
                    <div className="d-flex align-items-center glass-card px-4 py-2 shadow-sm border-0">
                    <i className="bi bi-person-circle fs-4 text-primary me-2"></i>
                    <div>
                        <small className="text-muted d-block lh-1" style={{ fontSize: "11px", color: "#9ec5fe" }}>Usuário logado</small>
                        <span className="fw-bold">{usuarios ? usuarios.nome : 'Carregando...'}</span>
                    </div>
                </div>
            </div>

            <div className="glass-card shadow-sm border-0 mb-5">
                <div className="card-body p-4">
                    <h5 className="card-title fw-bold text-secondary mb-4">{editando ? "Editar Pedido" : "Novo Pedido"}</h5>
                    <div className="row g-3">
                        <div className="col-12 col-md-3">
                            <select className="form-select form-select-lg" value={id_setor} onChange={e => setIdSetor(e.target.value)}>
                                <option disabled hidden value="">Setor</option>
                                {setores.map(s => (
                                    <option key={s.id} value={s.id}>{s.salas}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-12 col-md-3">
                            <select className="form-select form-select-lg" value={id_equipamento} onChange={e => setIdEquipamento(Number(e.target.value))}>
                                <option disabled hidden value="">Equipamento</option>
                                {equipamentos.map(e => (
                                    <option key={e.id} value={e.id}>{e.nome}</option>
                                ))}
                            </select>
                            <small className="text-success fw-semibold mt-1 d-block"><i className="bi bi-check-circle-fill me-1"></i> Estoque: {equipamentoSelecionado?.quantidade || 0} unid.</small>
                        </div>

                        <div className="col-6 col-md-2">
                            <input
                                type="number"
                                className="form-control form-control-lg"
                                placeholder="Qtd"
                                value={quantidade}
                                onChange={e => setQuantidade(e.target.value)}
                            />
                        </div>

                        <div className="col-6 col-md-2">
                            <select className="form-select form-select-lg" value={turno} onChange={e => setTurno(e.target.value)}>
                                <option disabled hidden value="">Turno</option>
                                <option>Manhã</option>
                                <option>Tarde</option>
                                <option>Noite</option>
                            </select>
                        </div>

                        <div className="col-12 col-md-2">
                            <input 
                                type="date" 
                                className="form-control form-control-lg" 
                                value={dataPedido} 
                                onChange={e => setDataPedido(e.target.value)} 
                            />
                        </div>

                        <div className="col-12 mt-4 d-flex gap-2">
                            <button type="button" className={`btn btn-lg fw-bold flex-grow-1 shadow-sm ${editando ? "btn-warning text-white" : "btn-primary"}`} onClick={salvar}>
                                <i className={`bi ${editando ? "bi-check2-square" : "bi-plus-circle"} me-2`}></i>{editando ? "Atualizar Pedido" : "Confirmar Pedido"}
                            </button>
                            {editando && (
                                <button className="btn btn-lg btn-light border fw-bold px-4" onClick={cancelar}>Cancelar</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card shadow-sm border-0 overflow-hidden">
                <div className="table-responsive-custom">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4 d-none d-md-table-cell">Solicitante</th>
                                <th>Setor</th>
                                <th>Equipamento</th>
                                <th className="text-center">Qtd</th>
                                <th className="d-none d-sm-table-cell">Data Agendada</th>
                                <th>Turno</th>
                                <th className="text-end pe-4">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itensAtuais.map(p => (
                                <tr key={p.id}>
                                    <td className="ps-4 fw-medium d-none d-md-table-cell text-wrap" style={{ minWidth: "100px" }}>{p.id_usuario?.nome}</td>
                                    <td><span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary-subtle px-2 py-1 text-wrap text-start" style={{ minWidth: "90px" }}>{p.id_setor?.salas}</span></td>
                                    <td className="fw-medium text-wrap" style={{ minWidth: "100px" }}>{p.id_equipamento?.nome}</td>
                                    <td className="text-center fw-bold">{p.quantidade}</td>
                                    <td className="d-none d-sm-table-cell">
                                        <div className="d-flex align-items-center text-secondary-custom fw-medium">
                                            <i className="bi bi-calendar-event me-2"></i>
                                            {p.data_agendada ? p.data_agendada.split('-').reverse().join('/') : '-'}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${p.turno === 'Manhã' ? 'bg-warning text-black' : p.turno === 'Tarde' ? 'bg-danger' : 'bg-primary'} rounded-pill px-3`}>
                                            {p.turno}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="btn-group shadow-sm">
                                            <button className="btn btn-outline-primary btn-sm px-3" onClick={() => editar(p)} title="Editar"><i className="bi bi-pencil-fill"></i></button>
                                            <button className="btn btn-outline-danger btn-sm px-3" onClick={() => excluir(p.id)} title="Excluir"><i className="bi bi-trash3-fill"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pedidos.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted">Ainda não há nenhum pedido cadastrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    
                    <div className="p-3">
                        <Paginacao totalItens={pedidos.length} itensPorPagina={itensPorPagina} paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} />
                    </div>
                </div>
            </div>
        </div>
    )
}