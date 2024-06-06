import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import axios from 'axios'; // Importar Axios
import { ComponenteColumna } from './components/ComponenteColumna';
import { PrimerComponente } from './components/PrimerComponente';
import { SegundoComponente } from './components/SegundoComponente';
import { TercerComponente } from './components/TercerComponente';
import { CuartoComponente } from './components/CuartoComponente';
import { QuintoComponente } from './components/QuintoComponente';
import { SextoComponente } from './components/SextoComponente';
import { SeptimoComponente } from './components/SeptimoComponente';
import { OctavoComponente } from './components/OctavoComponente';
import Login from './pages/login';
import Inscripcion from "./pages/inscripcion";

function App() {
    const [courses, setCourses] = useState([]); // Estado para almacenar los cursos

    // Función para buscar cursos
    const searchCourses = (query) => {
        axios.get(`http://localhost:8080/courses/search?query=${query}`)
            .then(response => {
                setCourses(response.data.results); // Actualizar el estado con los resultados de la búsqueda
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
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
                        {/* SearchBar component for handling search functionality */}
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
                            <Route path="/" element={<MainContent courses={courses} />} />
                            <Route path="/inscripcion" element={<Inscripcion />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState(''); // Estado para el valor actual del input

    // Función para manejar el cambio en el input de búsqueda
    const handleSearchChange = (e) => {
        setQuery(e.target.value); // Actualizar el estado con el valor del input
    };

    // Función para manejar la búsqueda cuando se envía el formulario
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevenir la acción por defecto del formulario
        onSearch(query); // Llamar a la función de búsqueda del padre con el término de búsqueda actual
    };

    return (
        <>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    className="buscador"
                    placeholder="Buscar cursos..."
                    value={query}
                    onChange={handleSearchChange}
                />
            </form>
        </>
    );
}

function MainContent({ courses }) {
    return (
        <>
            <h1 className="titulo">Bienvenido a WebLearn!</h1>
            <div className="Courses">
                {courses.length > 0 ? (
                    courses.map(course => (
                        <div key={course.id} className="Course">
                            <div className="Course-details">
                                <h1 className="Course-title">{course.titulo}</h1>
                                <p className="Course-description">{course.descripcion}</p>
                                <p className="Course-category"><strong>{course.categoria}</strong></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron cursos para la búsqueda.</p>
                )}
            </div>
            <div className="container1">
                <div className="comp-1">
                    <PrimerComponente />
                </div>
                <div className="comp-2">
                    <SegundoComponente />
                </div>
                <div className="comp-3">
                    <TercerComponente />
                </div>
                <div className="comp-4">
                    <CuartoComponente />
                </div>
            </div>
            <div className="container2">
                <div className="comp-5">
                    <QuintoComponente />
                </div>
                <div className="comp-6">
                    <SextoComponente />
                </div>
                <div className="comp-7">
                    <SeptimoComponente />
                </div>
                <div className="comp-8">
                    <OctavoComponente />
                </div>
            </div>
        </>
    );
}

export default App;
