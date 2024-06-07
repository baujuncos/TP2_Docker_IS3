import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { ComponenteColumna } from './components/ComponenteColumna';
import Login from './pages/login';
import Inscripcion from "./pages/inscripcion";

function App() {
    const [courses, setCourses] = useState([]);
    const [validSearch, setValidSearch] = useState(false);

    useEffect(() => {
        loadCourses();
    }, []);

    const loadCourses = () => {
        fetch('http://localhost:8080/cursos')
            .then(response => response.json())
            .then(data => {
                console.log('Cursos cargados:', data);
                setCourses(data);
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
                    setCourses(data.results);
                    setValidSearch(data.results.length > 0);
                })
                .catch(error => {
                    console.error('Error fetching courses:', error);
                });
        }
    };

    const subscribeToCourse = (courseId) => {
        fetch('http://localhost:8080/subscriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ courseId })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Successfully subscribed to course', data);
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

    return (
        <>
            <h1 className="titulo">Bienvenido a WebLearn!</h1>
            <p>Explora un mundo de aprendizaje ilimitado con nuestra plataforma de cursos en línea. Desde desarrollo de habilidades profesionales hasta pasatiempos creativos, encontrarás una amplia variedad de cursos diseñados para enriquecer tu vida personal y profesional.</p>
            <div className="Courses">
                {validSearch ? (
                    courses.map(course => (
                        <div key={course.IdCurso} className="Course">
                            <div className="Course-details">
                                <h2 className="Course-title">{course.Titulo}</h2>
                                <p className="Course-description">{course.Descripcion}</p>
                                <p className="Course-category"><strong>{course.Categoria}</strong></p>
                                <button onClick={() => handleSubscribe(course.IdCurso)}>Suscribirse</button>
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
