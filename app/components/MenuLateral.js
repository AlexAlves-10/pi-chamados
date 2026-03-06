import Link from "next/link"


export default function MenuLateral() {
    return (
        <div>

            <h4 className="mb-4">Sistema</h4>

            <div className="list-group list-group-flush">
                <Link href="/" className="list-group-item list-group-item-action">Início</Link>
                <Link href="dashboard" className="list-group-item list-group-item-action">Dashboard</Link>
                <Link href="gerenciador_usuarios" className="list-group-item list-group-item-action">Usuários</Link>
                <Link href="pedidos" className="list-group-item list-group-item-action">Pedidos</Link>
                <Link href="equipamentos" className="list-group-item list-group-item-action">Equipamentos</Link>
                <Link href="calendario" className="list-group-item list-group-item-action">Calendário</Link>
                <Link href="setores" className="list-group-item list-group-item-action">Setores</Link>
            </div>
            
        </div>
    )
}