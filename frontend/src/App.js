import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { ComponenteColumna } from './components/ComponenteColumna';
import Login from './components/login';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function App() {
    const [courses, setCourses] = useState([]);
    const [validSearch, setValidSearch] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); // Nuevo estado para verificar si el usuario ha iniciado sesión
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadCourses();
        checkLoginStatus(); // Verificar el estado de inicio de sesión cuando se monta el componente
    }, []);

    const loadCourses = () => {
        fetch('http://localhost:8080/cursos')
            .then(response => response.json())
            .then(data => {
                console.log('Cursos cargados:', data);
                // Mapeamos los datos para convertir IdCurso a id_curso
                const normalizedCourses = data.map(curso => ({
                    id_curso: curso.id_curso,
                    Titulo: curso.Titulo,
                    Fecha_inicio: curso.FechaInicio,
                    Categoria: curso.Categoria,
                    Archivo: curso.Archivo,
                    Descripcion: curso.Descripcion
                }));
                setCourses(normalizedCourses);
                setValidSearch(true);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };

    const searchCourses = (query) => {
        if (query.trim() === '') {
            loadCourses();
        } else {
            fetch(`http://localhost:8080/courses/search?query=${query}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Resultados de búsqueda:', data);
                    setCourses(data.results);
                    setValidSearch(data.results.length > 0);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });
        }
    };

    const subscribeToCourse = (courseId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión para suscribirte a un curso.');
            return;
        }

        const userId = localStorage.getItem('userId');
        const fechaInscripcion = new Date().toISOString(); // Fecha actual en formato ISO

        // Convertir userId y courseId a enteros
        const userIdInt = parseInt(userId, 10);
        const courseIdInt = parseInt(courseId, 10);

        fetch('http://localhost:8080/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id_usuario: userIdInt, // Usar la versión entera de userId
                id_curso: courseIdInt, // Usar la versión entera de courseId
                fecha_inscripcion: fechaInscripcion,
                comentario: "Mi comentario"
            })
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 409) {
                        throw new Error(`Usuario ${userIdInt} ya está suscrito al curso ${courseIdInt}`);
                    }
                    return response.json().then(err => { throw new Error(err.message); });
                }
                return response.json();
            })
            .then(data => {
                console.log('Successfully subscribed to course', data);
                alert(`Te has inscrito con éxito al curso ${courseIdInt}`); // Mostrar mensaje de éxito
            })
            .catch(error => {
                console.error('Error subscribing to course:', error.message);
                alert(error.message); // Mostrar el error al usuario
            });
    };

    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setLoggedIn(false);
    };

    const openModal = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCourse(null);
        setIsModalOpen(false);
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <div className="logoytitulo">
                        <img src="logoweb.png" className="logoweb" alt="logo" />
                        <h2 className="nombreweb">WebLearn</h2>
                    </div>
                    <div className="buscador">
                        <SearchBar onSearch={searchCourses} />
                    </div>
                    <div className="user-login">
                        {loggedIn ? (
                            <>
                                <button className="logout-text" onClick={handleLogout}>Sign Out</button>
                                <img src="user-logo.png" className="user-logo" alt="user logo" />
                            </>
                        ) : (
                            <Link className="login-text" to="/login">Login</Link>
                        )}
                    </div>
                </header>
                <div className="App-cuerpo">
                    <ComponenteColumna />
                    <div className="contenido-principal">
                        <Routes>
                            <Route path="/login" element={<Login onLogin={checkLoginStatus} />} />
                            <Route path="/" element={<MainContent courses={courses} onSubscribe={subscribeToCourse} validSearch={validSearch} openModal={openModal} />} />
                        </Routes>
                    </div>
                </div>
            </div>
            {isModalOpen && selectedCourse && (
                <Modal course={selectedCourse} closeModal={closeModal} />
            )}
        </Router>
    );
}

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearchSubmit}>
            <input
                type="text"
                className="buscador"
                placeholder="Buscar cursos..."
                value={query}
                onChange={handleSearchChange}
            />
        </form>
    );
}

function MainContent({ courses, onSubscribe, validSearch, openModal }) {
    const handleSubscribe = (courseId) => {
        onSubscribe(courseId);
    };

    console.log('Cursos recibidos:', courses);

    return (
        <>
            <h1 className="titulo">Bienvenido a WebLearn!</h1>
            <p>Explora un mundo de aprendizaje ilimitado con nuestra plataforma de cursos en línea. Desde desarrollo de habilidades profesionales hasta pasatiempos creativos, encontrarás una amplia variedad de cursos diseñados para enriquecer tu vida personal y profesional.</p>
            <div className="Courses">
                {validSearch ? (
                    courses.map(course => (
                        <div key={course.id_curso} className="Course">
                            <div className="Course-details">
                                <div>
                                    <Link to="#" className="Course-title" onClick={() => openModal(course)}>
                                        {course.Titulo}
                                    </Link>
                                </div>
                                <button onClick={() => handleSubscribe(course.id_curso)}>Suscribirse</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="mensaje-error-busqueda"><strong>No se encontraron cursos para la búsqueda</strong></p>
                )}
            </div>
        </>
    );
}


function Modal({ course, closeModal }) {
    return (
        <Dialog open={true} onClose={closeModal}>
            <DialogTitle>{course.Titulo}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{course.Descripcion}</Typography>
                <div className="curso-categoria">
                    <Typography variant="body2"><strong>Categoría:</strong> {course.Categoria}</Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">Cerrar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default App;
