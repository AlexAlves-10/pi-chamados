import React from 'react';

const Paginacao = ({ totalItens, itensPorPagina, paginaAtual, setPaginaAtual }) => {
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);

    if (totalPaginas <= 1) return null;

    const navPages = [];
    for (let i = 1; i <= totalPaginas; i++) {
        navPages.push(i);
    }

    return (
        <nav className="d-flex justify-content-end mt-3">
            <ul className="pagination pagination-sm mb-0 shadow-sm">
                <li className={`page-item ${paginaAtual === 1 ? 'disabled' : ''}`}>
                    <button 
                        className="page-link" 
                        onClick={() => setPaginaAtual(paginaAtual - 1)}
                        style={{cursor: paginaAtual === 1 ? 'not-allowed' : 'pointer'}}
                    >
                        Anterior
                    </button>
                </li>
                
                {navPages.map(num => (
                    <li key={num} className={`page-item ${paginaAtual === num ? 'active' : ''}`}>
                        <button 
                            className="page-link" 
                            onClick={() => setPaginaAtual(num)}
                            style={paginaAtual === num ? {backgroundColor: "var(--text-primary)", borderColor: "var(--text-primary)"} : {}}
                        >
                            {num}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}`}>
                    <button 
                        className="page-link" 
                        onClick={() => setPaginaAtual(paginaAtual + 1)}
                        style={{cursor: paginaAtual === totalPaginas ? 'not-allowed' : 'pointer'}}
                    >
                        Próximo
                    </button>
                </li>
            </ul>
            
            <div className="ms-3 d-flex align-items-center">
                <span className="text-muted small me-2 fw-medium">Ir para:</span>
                <input 
                    type="number" 
                    min="1" 
                    max={totalPaginas} 
                    className="form-control form-control-sm text-center shadow-sm text-primary" 
                    style={{ width: "65px", borderColor: "var(--text-primary)" }}
                    placeholder={paginaAtual}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val) && val >= 1 && val <= totalPaginas) {
                                setPaginaAtual(val);
                                e.target.value = '';
                            } else {
                                alert(`Por favor, digite uma página válida entre 1 e ${totalPaginas}`);
                                e.target.value = '';
                            }
                        }
                    }}
                />
            </div>

        </nav>
    );
};

export default Paginacao;
