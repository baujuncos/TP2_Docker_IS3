import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios'; // Importar Axios
import { ComponenteColumna } from './components/ComponenteColumna';
import Login from './pages/login';
import Inscripcion from "./pages/inscripcion";
import XHRAdapter from 'axios/lib/adapters/xhr.js';

axios.defaults.adapter = XHRAdapter;

function App() {
    const [courses, setCourses] = useState([]);
    const [validSearch, setValidSearch] = useState(false);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = () => {
        axios.get('http://localhost:8080/cursos')
            .then(response => {
                console.log('Cursos cargados:', response.data); // Debug: Verificar los datos recibidos
                setCourses(response.data); // Asumo que la respuesta contiene directamente la lista de cursos
                setValidSearch(true);// Esto indica que la búsqueda es válida al cargar todos los cursos
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };

    const searchCourses = (query) => {
        if (query.trim() === '') {
            loadCourses();
        } else {
            axios.get(`http://localhost:8080/courses/search?query=${query}`)
                .then(response => {
                    setCourses(response.data.results);
                    setValidSearch(response.data.results.length > 0);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });
        }
    };

    const subscribeToCourse = (courseId) => {
        axios.post('http://localhost:8080/subscriptions', { courseId })
            .then(response => {
                console.log('Successfully subscribed to course');
            })
            .catch(error => {
                console.error('Error subscribing to course:', error);
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
                        <Link className="login-text" to="/login">Login</Link>
                        <img src="user-logo.png" className="user-logo" alt="user logo" />
                    </div>
                </header>
                <div className="App-cuerpo">
                    <ComponenteColumna />
                    <div className="contenido-principal">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<MainContent courses={courses} onSubscribe={subscribeToCourse} validSearch={validSearch} />} />
                            <Route path="/inscripcion" element={<Inscripcion />} />
                        </Routes>
                    </div>
                </div>
            </div>
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

function MainContent({ courses, onSubscribe, validSearch }) {
    const handleSubscribe = (courseId) => {
        onSubscribe(courseId);
    };

    console.log('Cursos en MainContent:', courses); // Verificar los datos recibidos en MainContent

    return (
        <>
            <h1 className="titulo">Bienvenido a WebLearn!</h1>
            <p>Explora un mundo de aprendizaje ilimitado con nuestra plataforma de cursos en línea. Desde desarrollo de habilidades profesionales hasta pasatiempos creativos, encontrarás una amplia variedad de cursos diseñados para enriquecer tu vida personal y profesional.</p>
            <div className="Courses">
                {validSearch ? (
                    courses.map(course => (
                        <div key={course.id} className="Course">
                            <div className="Course-details">
                                <h2 className="Course-title">{course.titulo}</h2>
                                <p className="Course-description">{course.descripcion}</p>
                                <p className="Course-category"><strong>{course.categoria}</strong></p>
                                <button onClick={() => handleSubscribe(course.id)}>Suscribirse</button>
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

export default App;