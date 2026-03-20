'use client'

import { useEffect, useState } from "react";

import { createClient } from '@supabase/supabase-js'
const supabase = createClient("https://ekdskhpbgorgflhhehfp.supabase.co", "sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ")

//*functions
export default function Pedidos() {
    const [id_usuario, alteraIdusuario] = useState("")
    const [id_setor, alteraIdsetor] = useState("")
    const [id_equipamento, alteraIdequipamento] = useState("")
    const [quantidade, alteraQuantidade] = useState("")
    const [turno, alteraTurno] = useState("")
    const [pedidos, alteraPedidos] = useState([])

// criadas para realizar a seleção de chaves
    const [listaUsuarios, alteraListaUsuarios] = useState([])
    const [listasetores, alteraListasetores] = useState([])
    const [listaEquipamentos, alteraListaEquipamentos] = useState([])
    

// somente turno
function formataTurno (turno){

if(turno == "manhã"){
    return <span className="badge rounded-pill text-bg-primary">Manha</span>
}

if(turno == "tarde"){
    return <span className="badge rounded-pill text-bg-danger">Tarde</span>
}

if(turno == "noite" ){
    return <span className="badge rounded-pill text-bg-warning">Noite</span>
}

}
//*async function
    async function buscarPedidos() {
        const { data, error } = await supabase
            .from("pedidos")
            .select('*, id_usuario(nome), id_equipamento(nome), id_setor(salas)' )

            if(data){
                alteraPedidos(data)
            }
    }

async function buscarUsuarios(){
    const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            console.log(error)
        alteraListaUsuarios(data)

}

async function buscarsetores(){
    const { data, error } = await supabase
            .from('setores')
            .select('*')
            console.log(error)
        alteraListasetores(data)

}

async function buscarEquipamentos(){
    const { data, error } = await supabase
            .from('equipamentos')
            .select('*')
            console.log(error)
        alteraListaEquipamentos(data)

}


// function excluir
async function excluir(id) {
        const opcao = confirm("Tem certeza que deseja excluir?")
        if (opcao == false) {
            return
        }
        const response = await supabase.from('pedidos').delete().eq('id', id)}
// condigo inicial
    async function salvar(e) {
        e.preventDefault()
        const objeto = {
            id_usuario: id_usuario,
            id_setor: id_setor,
            id_equipamento: id_equipamento,
            quantidade: quantidade,
            turno: turno
        }

        const {data, error } = await supabase
            .from('pedidos')
            .insert(objeto)
            
      console.log(objeto)
      console.log(data)
      console.log(error)

        if (error == null) {
            alert("Pedido cadastrado com sucesso!")
            alteraIdusuario("")
            alteraIdsetor("")
            alteraIdequipamento("")
            alteraQuantidade("")
            alteraTurno("")
           buscarPedidos() 
        } else {
            alert("Dados incorretos, tente novamente...")
        }

            // adicionei buscas
    }
    useEffect(() => {
        buscarPedidos()
        buscarUsuarios()
        buscarsetores()
        buscarEquipamentos()
        
    }, [])
//* tabelas, formularios
    return (

        <div >
            <h1 className="titulo ">Gerenciamento de pedidos🧾</h1>
            <br />
            <h2 className=" text-center">Cadastro de novo pedido💻</h2>
            <br />
            {/* selecione o usuario */}
            <div> <form onSubmit={salvar} >
                    <p>Selecione o Usuario</p>
                    <select onChange={e => alteraIdusuario(e.target.value)}>    
                    <option>Selecione...</option>
                    {
                        listaUsuarios.map(

                            item => <option value={item.id}> {item.nome} </option>

                        )
                    }
                    </select>
                    

<br/>
<br/>
                {/* selecione o setor */}
                <p>Selecione o Setor</p>
                    <select onChange={e => alteraIdsetor(e.target.value)}>    
                    <option>Selecione...</option>
                    {
                        listasetores.map(

                            item => <option value={item.id}> {item.salas} </option>

                        )
                    }
                    </select>
<br/>
<br/>
{/* selecione o equipamento */}
                    <p>Selecione o Equipamento</p>
                    <select onChange={e => alteraIdequipamento(e.target.value)}>    
                        <option>Selecione...</option>
                    {
                        listaEquipamentos.map(

                            item => <option value={item.id}> {item.nome} </option>

                        )
                    }
                    </select>
                    

<br/>
<br/>
{/* selecione a quantidade */}
                    <p>Insira a quantidade</p>
                    <input onChange={e => alteraQuantidade(e.target.value)}/>
<br/>
<br/>
{/* selecione o turno */}
                    <p>Selecione o Turno</p>
                    <select onChange={e => alteraTurno(e.target.value)} >    
                        <option>Selecione...</option>
                        <option>Manhã</option>
                        <option>Tarde</option>
                        <option>Noite</option>
                
                    </select>

            </form></div>
            <br/>
             <br/>
            <button className="text-align-right bnt-bnt primary" onClick={salvar}>Salvar</button>

 <br/>
  <br/>
{/* tabela */}
            <table className="table">
                <thead>
                    <tr>
                        <th > nome  </th>
                        <th > setor </th>
                        <th > equipamento </th>
                        <th > quantidade  </th>
                        <th > turno  </th>
                        <th> Ações </th>
                    </tr>
                </thead>

                <tbody>
                    {pedidos.map(
                        item => <tr>
                            <td>{item.id_usuario.nome}</td>
                            <td>{item.id_setor.salas}</td>
                            <td>{item.id_equipamento.nome}</td>
                            <td>{item.quantidade}</td>
                            <td>{formataTurno(item.turno)}</td>
                            <td> <button onClick={() => location.href = "/pedidos/" + item.id} >Ver</button>
                                    <button onClick={() => excluir(item.id)}>Excluir</button> </td>
                        </tr>

                    )

                    }
                </tbody>

            </table>




       

        </div>



    )
}
































































// codigo do chat 
//'use client'

// import { useEffect, useState } from "react";
// import { createClient } from '@supabase/supabase-js'

// const supabase = createClient("https://ekdskhpbgorgflhhehfp.supabase.co", "sb_publishable_IXnnnkyVkAxmOe4AhwF6VA_F3RzJrnJ")

// export default function Pedidos() {
//     const [id_usuario, alteraIdusuario] = useState("")
//     const [id_setor, alteraIdsetor] = useState("")
//     const [id_equipamento, alteraIdequipamento] = useState("")
//     const [quantidade, alteraQuantidade] = useState("")
//     const [turno, alteraTurno] = useState("")
//     const [pedidos, alteraPedidos] = useState([])
    
//     // ESTADO PARA MOSTRAR/ESCONDER
//     const [exibirLista, alteraExibirLista] = useState(false)

//     function formataTurno(turno) {
//         if (turno == "manhã") return <span className="badge rounded-pill text-bg-primary">Manha</span>
//         if (turno == "tarde") return <span className="badge rounded-pill text-bg-danger">Tarde</span>
//         if (turno == "noite") return <span className="badge rounded-pill text-bg-warning">Noite</span>
//         return <span className="badge rounded-pill text-bg-secondary">{turno}</span>
//     }

//     // FUNÇÃO PARA INVERTER A TELA
//     function alternarVisualizacao() {
//         alteraExibirLista(!exibirLista)
//     }

//     async function buscarPedidos() {
//         const { data, error } = await supabase
//             .from("pedidos")
//             .select('*, id_usuario(nome), id_equipamento(nome), id_setor(salas)')

//         if (data) {
//             alteraPedidos(data)
//         }
//     }

//     async function salvar() {
//         const objeto = {
//             id_usuario: id_usuario,
//             id_setor: id_setor,
//             id_equipamento: id_equipamento,
//             quantidade: quantidade,
//             turno: turno
//         }

//         const { data, error } = await supabase
//             .from('pedidos')
//             .insert(objeto)

//         if (error == null) {
//             alert("Pedido cadastrado com sucesso!")
//             buscarPedidos() 
//             alteraExibirLista(true) // Mostra a lista após salvar
//         } else {
//             alert("Dados incorretos, tente novamente...")
//         }
//     }

//     useEffect(() => {
//         buscarPedidos()
//     }, [])

//     return (
//         <div className="container mt-5">
//             <div className="text-center mb-4">
//                 <h1 className="fw-bold text-primary">Sistema de Pedidos 🧾</h1>
                
//                 {/* BOTÃO DE ALTERNAR */}
//                 <button className="btn btn-outline-secondary mt-3" onClick={alternarVisualizacao}>
//                     {exibirLista ? "⬅️ Voltar para Cadastro" : "📊 Gerar Dados (Ver Lista)"}
//                 </button>
//             </div>

//             {/* SE FOR FALSE: MOSTRA O CADASTRO */}
//             { !exibirLista && (
//                 <div className="card shadow border-0 p-4">
//                     <h2 className="text-center mb-4">Novo Pedido 💻</h2>
//                     <div className="row g-3">
//                         <div className="col-md-6">
//                             <label className="form-label fw-bold">Nome do usuario</label>
//                             <input onChange={e => alteraIdusuario(e.target.value)} className="form-control" />
//                         </div>
//                         <div className="col-md-6">
//                             <label className="form-label fw-bold">Nome do setor</label>
//                             <input onChange={e => alteraIdsetor(e.target.value)} className="form-control" />
//                         </div>
//                         <div className="col-md-4">
//                             <label className="form-label fw-bold">Equipamento</label>
//                             <input onChange={e => alteraIdequipamento(e.target.value)} className="form-control" />
//                         </div>
//                         <div className="col-md-4">
//                             <label className="form-label fw-bold">Quantidade</label>
//                             <input onChange={e => alteraQuantidade(e.target.value)} className="form-control" />
//                         </div>
//                         <div className="col-md-4">
//                             <label className="form-label fw-bold">Turno</label>
//                             <input onChange={e => alteraTurno(e.target.value)} className="form-control" />
//                         </div>
//                         <div className="col-12 mt-4">
//                             <button className="btn btn-primary btn-lg w-100" onClick={salvar}>Salvar Pedido</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* SE FOR TRUE: MOSTRA A LISTA */}
//             { exibirLista && (
//                 <div className="mt-2 animate__animated animate__fadeIn">
//                     <h2 className="text-center mb-4">Lista de Pedidos no Banco 📁</h2>
//                     <div className="table-responsive shadow-sm">
//                         <table className="table table-striped table-hover mb-0">
//                             <thead className="table-dark">
//                                 <tr>
//                                     <th>Nome</th>
//                                     <th>Setor</th>
//                                     <th>Equipamento</th>
//                                     <th>Qtd</th>
//                                     <th>Turno</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {pedidos.map(item => (
//                                     <tr>
//                                         <td>{item.id_usuario?.nome}</td>
//                                         <td>{item.id_setor?.salas}</td>
//                                         <td>{item.id_equipamento?.nome}</td>
//                                         <td className="fw-bold">{item.quantidade}</td>
//                                         <td>{formataTurno(item.turno)}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }



