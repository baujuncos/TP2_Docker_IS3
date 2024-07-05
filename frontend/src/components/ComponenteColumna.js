import React from 'react';
import { Link } from 'react-router-dom';

export const ComponenteColumna = ({ isAdmin }) => {
    return (
        <div className="componente-columna">
            <p><Link className="home-texto" to="/">Home</Link></p>
            <p><Link className="miscursos-texto" to="/miscursos">Mis Cursos</Link></p>

            {isAdmin && ( // Conditionally render admin links
                <>
                    <p><Link className="admin-texto" to="/admin/cursos">Crear Curso</Link></p>
                    <p><Link className="admin-texto" to="/admin/cursos">Editar Curso</Link></p>
                    <p><Link className="admin-texto" to="/admin/cursos">Eliminar Curso</Link></p>
                </>
            )}
        </div>
    );
};
