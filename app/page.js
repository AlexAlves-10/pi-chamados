import Link from "next/link";


export default function Home() {
  return (
    <div>
      <h1> Bem-Vindo </h1>
      <Link href="dashboard" class="list-group-item list-group-item-action">Dashboard</Link>
      <Link href="gerenciador_usuarios" class="list-group-item list-group-item-action">Usuários</Link>
      <Link href="pedidos" class="list-group-item list-group-item-action">Pedidos</Link>
      <Link href="equipamentos" class="list-group-item list-group-item-action">Equipamentos</Link>
      <Link href="calendario" class="list-group-item list-group-item-action">Calendário</Link>
      <Link href="setores" class="list-group-item list-group-item-action">Setores</Link>
    </div>
  );
}
