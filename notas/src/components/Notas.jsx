import React from 'react'

export default function Notas({title, content, id, deleteNota, getNota}) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start mb-3">
            <div className="ms-2 me-auto">
                <div className="fw-bold">{title}</div>
                {content}
            </div>
            <div className="d-flex justify-content-between">
                <button onClick={(e)=>getNota(id)} className="btn btn-info btn-sm">Editar</button>
                <button onClick={(e)=>deleteNota(id)} className="btn btn-outline-danger btn-sm">Eliminar</button>
            </div>
        </li>
    )
}
