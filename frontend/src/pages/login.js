import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    return (
        <div className="login-container">
            <h2>LOGIN</h2>
            <p>Nombre de Usuario</p>
            <input className="caja-nombre-usuario" type="text" placeholder="Ingresa tu nombre de usuario"/>
            <p>Contraseña</p>
            <input className="caja-contraseña" type="password" placeholder="Ingresa tu contraseña"/>
            <div>
                <button type="button" className="login-button">Login</button>
            </div>
        </div>

    );
}

export default Login;
