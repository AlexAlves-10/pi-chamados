import Link from "next/link";

export default function Pedidos() {
    return (
        <div className="container">

            <h2 className="text-center">Pedidos em aberto 🚨</h2>

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {[
                    { turno: "MANHÃ", total: 65 },
                    { turno: "TARDE", total: 25 },
                    { turno: "NOITE", total: 9 },
                ].map((item) => (
                    <div className="col" key={item.turno}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{item.turno}</h5>
                                <p className="card-text">
                                    Total de pedidos em aberto: {item.total}
                                </p>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-outline-primary w-100">
                                    Ver pedidos
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}