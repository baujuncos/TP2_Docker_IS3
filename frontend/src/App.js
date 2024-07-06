import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { format, parseISO } from 'date-fns';
import { ComponenteColumna } from './components/ComponenteColumna';
import Login from './components/login';
import { MisCursos } from './components/miscursos';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';  // Asegúrate de instalar @mui/icons-material

function App() {
    const [courses, setCourses] = useState([]);
    const [files, setFiles] = useState([]); // Estado para los archivos subidos
    const [validSearch, setValidSearch] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false); // Nuevo estado para verificar si el usuario ha iniciado sesión
    const [userType, setUserType] = useState(false); // Nuevo estado para verificar el tipo de usuario
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editCourse, setEditCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({
        Titulo: "",
        FechaInicio: "",
        Categoria: "",
        Archivo: "",
        Descripcion: ""
    });

    useEffect(() => {
        loadCourses();
        loadFiles(); // Cargar archivos al montar el componente
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

    const loadFiles = () => {
        fetch('http://localhost:8080/files')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch files');
                }
                return response.json();
            })
            .then(data => {
                setFiles(data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
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
            const userType = localStorage.getItem('userType') === 'true'; // Lee el userType y conviértelo a booleano
            setUserType(userType);
        } else {
            setLoggedIn(false);
            setUserType(false); // Si no hay token, asegúrate de que userType sea false
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
            FechaInicio: format(parseISO(course.Fecha_inicio), 'yyyy-MM-dd'), // Formatear la fecha
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

        // Convierte la fecha a formato ISO 8601 con una hora predeterminada
        const fechaInicioISO = new Date(newCourse.FechaInicio).toISOString();

        const courseToCreate = {
            ...newCourse,
            FechaInicio: fechaInicioISO
        };

        console.log('Datos del nuevo curso:', courseToCreate); // Agrega esto para depuración

        fetch('http://localhost:8080/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(courseToCreate)
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

        fetch(`http://localhost:8080/cursos/${editCourse.id_curso}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                Titulo: newCourse.Titulo,
                Fecha_inicio: newCourse.FechaInicio,
                Categoria: newCourse.Categoria,
                Archivo: newCourse.Archivo,
                Descripcion: newCourse.Descripcion
            })
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        try {
                            const data = JSON.parse(text);
                            throw new Error(data.message || 'Error en la respuesta del servidor.');
                        } catch (error) {
                            throw new Error('La respuesta del servidor no es un JSON válido.');
                        }
                    });
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

        fetch(`http://localhost:8080/cursos/${courseId}`, {
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
                                    {userType && (
                                        <>
                                            <button onClick={openCreateModal}>Crear Curso</button>
                                        </>
                                    )}
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
                                <Route path="/" element={<MainContent courses={courses} files={files} onSubscribe={subscribeToCourse} validSearch={validSearch} openModal={openModal} onDelete={deleteCourse} onEdit={openEditModal} userType={userType} />} />
                                <Route path="/miscursos" element={<MisCursos />}></Route>
                            </Routes>
                        </div>
                    </div>
                </div>
                {isModalOpen && selectedCourse && (
                    <Modal course={selectedCourse} closeModal={closeModal} onUpload={() => { loadCourses(); loadFiles(); }} />
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

    function MainContent({ courses, files, onSubscribe, validSearch, openModal, onDelete, onEdit, userType }) {
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
                                {userType && (
                                    <>
                                        <button onClick={() => onEdit(course)}>Editar</button>
                                        <button onClick={() => onDelete(course.id_curso)}>Eliminar</button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="Files">
                    <h2>Archivos Subidos</h2>
                    {files.map(file => (
                        <div key={file} className="File">
                            <a href={`http://localhost:8080/uploads/${file}`} target="_blank" rel="noopener noreferrer">{file}</a>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    function Modal({ course, closeModal, onUpload }) {
        const [file, setFile] = useState(null);
        const [uploadedFileUrl, setUploadedFileUrl] = useState("");

        const handleFileChange = (e) => {
            setFile(e.target.files[0]);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            if (!file) {
                alert("Por favor, seleccione un archivo para subir.");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            const token = localStorage.getItem('token');
            if (!token) {
                alert('Debes iniciar sesión para subir archivos.');
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/upload', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Error subiendo el archivo.');
                }

                const result = await response.json();
                alert(result.message);
                setUploadedFileUrl(`http://localhost:8080/uploads/${file.name}`);
                onUpload();  // Callback para actualizar la lista de archivos o cursos si es necesario
            } catch (error) {
                console.error('Error:', error);
                alert('Error subiendo el archivo');
            }
        };

        return (
            <Dialog open={true} onClose={closeModal}>
                <DialogTitle>{course.Titulo}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">{course.Descripcion}</Typography>
                    <div className="curso-categoria">
                        <Typography variant="body2"><strong>Categoría:</strong> {course.Categoria}</Typography>
                    </div>
                    {/* Botón para subir archivos */}
                    <form className="upload-form" onSubmit={handleSubmit}>
                        <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="upload-button" />
                        <label htmlFor="upload-button">
                            <Button variant="contained" component="span" startIcon={<UploadIcon />}>
                                Subir Archivo
                            </Button>
                        </label>
                        <button type="submit">Subir</button>
                    </form>
                    {/* Mostrar enlace o vista previa del archivo subido */}
                    {uploadedFileUrl && (
                        <div>
                            <Typography variant="body2">Archivo subido:</Typography>
                            <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
                                {file.name}
                            </a>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">Cerrar</Button>
                </DialogActions>
            </Dialog>
        );
    }

    export default App;
