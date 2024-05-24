import logo from './logo.svg';
import './App.css';
import {PrimerComponente} from "./components/PrimerComponente";
import {SegundoComponente} from "./components/SegundoComponente";
import {TercerComponente} from "./components/TercerComponente";
import {CuartoComponente} from "./components/CuartoComponente";
import {ComponenteColumna} from "./components/ComponenteColumna";
import {QuintoComponente} from "./components/QuintoComponente";
import {SextoComponente} from "./components/SextoComponente";
import {SeptimoComponente} from "./components/SeptimoComponente";
import {OctavoComponente} from "./components/OctavoComponente";

function App() {
  return (
      <div className="App">
        <body>
        <header className="App-header">
          <div className="logoytitulo">
            <img src="logoweb.png" className="logoweb" alt="logo"/>
            <h2 className="nombreweb">WebLearn</h2>
          </div>
          <div className="buscador">
            <input className="buscador" type="text" placeholder="Buscar cursos..."/>
            <button type="button" className="search-button">🔎</button>
          </div>
          <div className="user-login">
            <span className="login-text">Login</span>
            <img src="user-logo.png" className="user-logo" alt="user logo"/>
          </div>
        </header>
        <div className="App-cuerpo">
          <ComponenteColumna/>
          <div className="contenido-principal">
            <h1 className="titulo">Bienvenido a WebLearn!</h1>
            <p className="descripcion">Explora un mundo de aprendizaje ilimitado con nuestra plataforma de cursos en línea. Desde desarrollo de habilidades
              profesionales hasta pasatiempos creativos, encontrarás una amplia variedad de cursos diseñados para enriquecer tu
              vida personal y profesional.</p>
            <div className="container1">
              <div className="comp-1">
                <PrimerComponente/>
              </div>
              <div className="comp-2">
                <SegundoComponente/>
              </div>
              <div className="comp-3">
                <TercerComponente/>
              </div>
              <div className="comp-4">
                <CuartoComponente/>
              </div>
            </div>
            <div className="container2">
              <div className="comp-5">
                <QuintoComponente/>
              </div>
              <div className="comp-6">
                <SextoComponente/>
              </div>
              <div className="comp-7">
                <SeptimoComponente/>
              </div>
              <div className="comp-8">
                <OctavoComponente/>
              </div>
            </div>
          </div>
        </div>
        </body>
      </div>
  );
}

export default App;
