'use client'
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import 'bootstrap-icons/font/bootstrap-icons.css';

const supabase = createClient(
    "https://ekdskhpbgorgflhhehfp.supabase.co",
    "sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ"
)

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

    const equipamentoSelecionado = equipamentos.find(e => e.id == id_equipamento)

    // =========================
    // BUSCAS
    // =========================

    async function buscarPedidos() {
        const { data } = await supabase
            .from("pedidos")
            .select('*, id_usuario(nome), id_equipamento(id,nome,quantidade), id_setor(id,salas)')

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
        setIdSetor(item.id_setor?.id || "")
        setIdEquipamento(item.id_equipamento?.id || "")
        setQuantidade(item.quantidade)
        setTurno(item.turno)
    }

    function cancelar() {
        setEditando(null)
        setIdUsuario("")
        setIdSetor("")
        setIdEquipamento("")
        setQuantidade("")
        setTurno("")
    }

    async function excluir(id) {
        if (!confirm("Tem certeza?")) return
        await supabase.from('pedidos').delete().eq('id', id)
        buscarPedidos()
    }

    async function salvar() {

        const qtd = Number(quantidade)

        if (!id_usuario || !id_setor || !id_equipamento || !qtd) {
            alert("Preencha todos os campos!")
            return
        }

        const { data: equip } = await supabase
            .from('equipamentos')
            .select('*')
            .eq('id', id_equipamento)
            .single()

        if (qtd > equip.quantidade) {
            alert("Sem estoque!")
            return
        }

        const dados = {
            id_usuario,
            id_setor,
            id_equipamento,
            quantidade: qtd,
            turno
        }

        if (editando) {
            await supabase.from('pedidos').update(dados).eq('id', editando)
            alert("Atualizado!")
        } else {
            await supabase.from('pedidos').insert(dados)
            await supabase
                .from('equipamentos')
                .update({ quantidade: equip.quantidade - qtd })
                .eq('id', id_equipamento)

            alert("Cadastrado!")
        }

        cancelar()
        buscarPedidos()
        buscarEquipamentos()
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
                    {usuarios && (<h5 style={{ margin: 0, fontWeight: "bold" }} ><strong> <i class="bi bi-person-circle"></i> </strong> {usuarios.nome}</h5>)}
                </div>

            </div>

            <select className="form-select mb-2 w-25" value={id_setor} onChange={e => setIdSetor(e.target.value)}>
                <option disabled hidden value="">Setor</option>
                {setores.map(s => (
                    <option key={s.id} value={s.id}>{s.salas}</option>
                ))}
            </select>

            <select className="form-select mb-2 w-25" value={id_equipamento} onChange={e => setIdEquipamento(e.target.value)}>
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

            <button className="btn btn-primary" onClick={salvar}>
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
                                    <button className="btn btn-primary me-2" onClick={() => editar(p)}> <i class="bi bi-pencil-fill"></i> </button>
                                    <button className="btn btn-danger" onClick={() => excluir(p.id)}> <i class="bi bi-trash3-fill"></i> </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}