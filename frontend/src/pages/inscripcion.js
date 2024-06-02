import React from 'react';
import { Dropdown } from 'react-bootstrap';

function Inscripcion() {
    return (
        <div className="inscripcion-container">
            <h2>INSCRIPCIÓN</h2>
            <div className="nombre-apellido-container">
                <div className="nombre-container">
                    <p className="nombre-texto">Nombre</p>
                    <input className="caja-nombre" type="text" placeholder="Ingresa tu nombre"/>
                </div>
                <div className="apellido-container">
                    <p className="apellido-texto">Apellido</p>
                    <input className="caja-apellido" type="text" placeholder="Ingresa tu apellido"/>
                </div>
            </div>
            <div className="email-usuario-container">
                <div className="email-container">
                    <p className="email-texto">Email</p>
                    <input className="caja-email" type="email" placeholder="Ej: 123@gmail.com"/>
                </div>
                <div className="nombre-usuario-container">
                    <p className="nombre-usuario-texto">Nombre de usuario</p>
                    <input className="caja-nombre-usuario" type="text" placeholder="Ingresa tu nombre de usuario"/>
                </div>
            </div>
            <div className="curso-container">
                <p>Selecciona el curso al que te quieras inscribir</p>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Seleccionar curso
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item href="#/curso-1">Curso 1</Dropdown.Item>
                        <Dropdown.Item href="#/curso-2">Curso 2</Dropdown.Item>
                        <Dropdown.Item href="#/curso-3">Curso 3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="inscripcion-button">
                <button type="button" className="inscripcion-button">INSCRIBIRME</button>
            </div>
        </div>

    );
}

export default Inscripcion;
