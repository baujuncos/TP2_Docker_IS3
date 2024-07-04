import React, { useEffect, useState } from 'react';

export const MisCursos = () => {
    const [cursosSuscritos, setCursosSuscritos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCursosSuscritos();
    }, []);

    const fetchCursosSuscritos = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) {
            console.error('Usuario no autenticado');
            return;
        }

        fetch(`http://localhost:8080/usuarios/${userId}/cursos`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setCursosSuscritos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error al cargar los cursos suscritos:', error);
                setLoading(false);
            });
    };

    if (loading) {
        return <p>Todavía no ha iniciado sesión</p>;
    }

    return (
        <div className="mis-cursos">
            <h2>Mis Cursos</h2>
            {cursosSuscritos.length > 0 ? (
                <div className="cursos-list">
                    {cursosSuscritos.map(curso => (
                        <div key={curso.id_curso} className="curso-item">
                            <p>{curso.Titulo}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No estás suscrito a ningún curso aún.</p>
            )}
        </div>
    );
}

export default MisCursos;
