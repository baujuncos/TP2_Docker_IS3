import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { PrimerComponente } from './components/PrimerComponente';
import { SegundoComponente } from './components/SegundoComponente';
import { TercerComponente } from './components/TercerComponente';
import { CuartoComponente } from './components/CuartoComponente';
import { QuintoComponente } from './components/QuintoComponente';
import { SextoComponente } from './components/SextoComponente';
import { SeptimoComponente } from './components/SeptimoComponente';
import { OctavoComponente } from './components/OctavoComponente';
import { ComponenteColumna } from './components/ComponenteColumna';
import Login from './pages/login';
import Inscripcion from "./pages/inscripcion";

function App() {
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
              <SearchBar />
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
                <Route path="/" element={<MainContent />} />
                <Route path="/inscripcion" element={<Inscripcion />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
  );
}

function SearchBar(){
  const [query, setQuery] = useState(''); // State for current input value
  const [search, setSearch] = useState(''); // State for confirmed search term
  const [courses, setCourses] = useState([]); // State for fetched courses

  useEffect(() => {
    if (search) {
      console.log(`Fetching data from http://localhost:8080/courses/search?query=${search}`)
      fetch(`http://localhost:8080/courses/search?query=${search}`)
          .then(response => response.json())
          .then(data => setCourses(data.results))
          .catch(error => console.error('Error fetching courses:', error));
    }
  }, [search]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Update the query state as the user types
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setSearch(query); // Update the search state with the current query value
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
              search && <p>No se encontraron cursos para la búsqueda.</p>
          )}
        </div>
      </>
  );
}

function MainContent() {
  return (
      <>
        <h1 className="titulo">Bienvenido a WebLearn!</h1>
        <p className="descripcion">
          Explora un mundo de aprendizaje ilimitado con nuestra plataforma de cursos en línea. Desde desarrollo de habilidades profesionales hasta pasatiempos creativos, encontrarás una amplia variedad de cursos diseñados para enriquecer tu vida personal y profesional.
        </p>
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
