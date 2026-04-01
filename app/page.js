"use client";

export default function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-3">Sistema de Chamados</h1>

      <p className="lead">
        Gerencie solicitações, acompanhe atendimentos e organize demandas de forma simples e eficiente.
      </p>

      <div className="mt-4">
        <a href="/login" className="btn btn-outline-secondary">
          Acessar Sistema
        </a>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <h5>📌 Registro rápido</h5>
          <p>Abra chamados em poucos cliques.</p>
        </div>

        <div className="col-md-4">
          <h5>📊 Acompanhamento</h5>
          <p>Veja o status dos seus chamados em tempo real.</p>
        </div>

        <div className="col-md-4">
          <h5>⚡ Organização</h5>
          <p>Mantenha tudo centralizado e organizado.</p>
        </div>
      </div>
    </div>
  );
}