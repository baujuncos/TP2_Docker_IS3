import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { ComponenteColumna } from './components/ComponenteColumna';
import Login from './components/login';
import { MisCursos } from './components/miscursos';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

function App() {
    const [courses, setCourses] = useState([]);
    const [validSearch, setValidSearch] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); // Nuevo estado para verificar si el usuario ha iniciado sesión
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editCourse, setEditCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({
        Titulo: '',
        FechaInicio: '',
        Categoria: '',
        Archivo: '',
        Descripcion: ''
    });

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
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 404) {
                            throw new Error('No courses found for the search query.');
                        }
                        throw new Error('An error occurred while searching for courses.');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Search results:', data);
                    setCourses(data.results);
                    setValidSearch(data.results.length > 0);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error.message);
                    setCourses([]); // Set courses to an empty array when no results are found
                    setValidSearch(false); // Set validSearch to false when no results are found
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

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        setNewCourse({
            Titulo: '',
            FechaInicio: '',
            Categoria: '',
            Archivo: '',
            Descripcion: ''
        });
    };

    const openEditModal = (course) => {
        setEditCourse(course);
        setNewCourse({
            Titulo: course.Titulo,
            FechaInicio: course.Fecha_inicio,
            Categoria: course.Categoria,
            Archivo: course.Archivo,
            Descripcion: course.Descripcion
        });
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditCourse(null);
    };

    const createCourse = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión para crear un curso.');
            return;
        }

        fetch('http://localhost:8080/admin/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newCourse)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message); });
                }
                return response.json();
            })
            .then(data => {
                console.log('Curso creado con éxito', data);
                alert('Curso creado con éxito');
                loadCourses();
                closeCreateModal();
            })
            .catch(error => {
                console.error('Error creando curso:', error.message);
                alert(error.message); // Mostrar el error al usuario
            });
    };

    const editCourseDetails = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión para editar un curso.');
            return;
        }

        fetch(`http://localhost:8080/admin/cursos/${editCourse.id_curso}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newCourse)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message); });
                }
                return response.json();
            })
            .then(data => {
                console.log('Curso editado con éxito', data);
                alert('Curso editado con éxito');
                loadCourses();
                closeEditModal();
            })
            .catch(error => {
                console.error('Error editando curso:', error.message);
                alert(error.message); // Mostrar el error al usuario
            });
    };

    const deleteCourse = (courseId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Debes iniciar sesión para eliminar un curso.');
            return;
        }

        fetch(`http://localhost:8080/admin/cursos/${courseId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message); });
                }
                return response.json();
            })
            .then(data => {
                console.log('Curso eliminado con éxito', data);
                alert('Curso eliminado con éxito');
                loadCourses();
            })
            .catch(error => {
                console.error('Error eliminando curso:', error.message);
                alert(error.message); // Mostrar el error al usuario
            });
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
                                <button className="create-course-text" onClick={openCreateModal}>Crear Curso</button>
                            </>
                        ) : (
                            <Link className="login-text" to="/login">Login</Link>
                        )}
                        <img src="user-logo.png" className="user-logo" alt="user logo"/>
                    </div>
                </header>
                <div className="App-cuerpo">
                    <ComponenteColumna />
                    <div className="contenido-principal">
                        <Routes>
                            <Route path="/login" element={<Login onLogin={checkLoginStatus} />} />
                            <Route path="/" element={<MainContent courses={courses} onSubscribe={subscribeToCourse} validSearch={validSearch} openModal={openModal} onDelete={deleteCourse} onEdit={openEditModal} />} />
                            <Route path="/miscursos" element={<MisCursos />}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
            {isModalOpen && selectedCourse && (
                <Modal course={selectedCourse} closeModal={closeModal} />
            )}
            {isCreateModalOpen && (
                <Dialog open={true} onClose={closeCreateModal}>
                    <DialogTitle>Crear Curso</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Título"
                            value={newCourse.Titulo}
                            onChange={(e) => setNewCourse({ ...newCourse, Titulo: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Fecha de Inicio"
                            type="date"
                            value={newCourse.FechaInicio}
                            onChange={(e) => setNewCourse({ ...newCourse, FechaInicio: e.target.value })}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Categoría"
                            value={newCourse.Categoria}
                            onChange={(e) => setNewCourse({ ...newCourse, Categoria: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Archivo"
                            value={newCourse.Archivo}
                            onChange={(e) => setNewCourse({ ...newCourse, Archivo: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Descripción"
                            value={newCourse.Descripcion}
                            onChange={(e) => setNewCourse({ ...newCourse, Descripcion: e.target.value })}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={createCourse} color="primary">Crear</Button>
                        <Button onClick={closeCreateModal} color="secondary">Cancelar</Button>
                    </DialogActions>
                </Dialog>
            )}
            {isEditModalOpen && editCourse && (
                <Dialog open={true} onClose={closeEditModal}>
                    <DialogTitle>Editar Curso</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Título"
                            value={newCourse.Titulo}
                            onChange={(e) => setNewCourse({ ...newCourse, Titulo: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Fecha de Inicio"
                            type="date"
                            value={newCourse.FechaInicio}
                            onChange={(e) => setNewCourse({ ...newCourse, FechaInicio: e.target.value })}
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Categoría"
                            value={newCourse.Categoria}
                            onChange={(e) => setNewCourse({ ...newCourse, Categoria: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Archivo"
                            value={newCourse.Archivo}
                            onChange={(e) => setNewCourse({ ...newCourse, Archivo: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            label="Descripción"
                            value={newCourse.Descripcion}
                            onChange={(e) => setNewCourse({ ...newCourse, Descripcion: e.target.value })}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={editCourseDetails} color="primary">Guardar</Button>
                        <Button onClick={closeEditModal} color="secondary">Cancelar</Button>
                    </DialogActions>
                </Dialog>
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

function MainContent({ courses, onSubscribe, validSearch, openModal, onDelete, onEdit }) {
    const handleSubscribe = (courseId) => {
        onSubscribe(courseId);
    };

    console.log('Received courses:', courses);

    return (
        <>
            <h1 className="titulo">Bienvenido a WebLearn!</h1>
            <p>Explora un mundo de aprendizaje ilimitado con nuestra plataforma de cursos en línea. Desde desarrollo de habilidades profesionales hasta pasatiempos creativos, encontrarás una amplia variedad de cursos diseñados para enriquecer tu vida personal y profesional.</p>
            <div className="Courses">
                {courses.map(course => (
                    <div key={course.id_curso} className="Course">
                        <div className="Course-details">
                            <div>
                                <Link to="#" className="Course-title" onClick={() => openModal(course)}>
                                    {course.Titulo}
                                </Link>
                            </div>
                            <button onClick={() => handleSubscribe(course.id_curso)}>Suscribirse</button>
                            <button onClick={() => onEdit(course)}>Editar</button>
                            <button onClick={() => onDelete(course.id_curso)}>Eliminar</button>
                        </div>
                    </div>
                ))}
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
