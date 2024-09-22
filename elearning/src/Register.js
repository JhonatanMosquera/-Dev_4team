import React, { useState } from "react";
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario

        // Limpiar el mensaje de error
        setError('');

        // Validar que los campos no estén vacíos
        if (!fullName || !email || !password) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        // Expresión regular para validar el correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Por favor, ingrese un correo electrónico válido.");
            return;
        }

        // Guardar el nombre en localStorage
        localStorage.setItem('userName', fullName);

        // Redirigir al home
        navigate('/home'); 
    };

    return (
        <div className="container">
            <div className="wrapper">
                <div className="right">
                    <h1 className="title">Crear una cuenta</h1>
                    <p className="text">Usa tu correo para registrarte</p>
                    {error && <div className="error-box"><p className="error-message">{error}</p></div>} {/* Mostrar mensaje de error */}
                    <form className="form">
                       <label>Nombre*</label>
                        <input 
                            className="input" 
                            placeholder="Nombre completo" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <label>Correo*</label>
                        <input 
                            className="input" 
                            placeholder="Correo electrónico" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Contraseña*</label>
                        <input 
                            className="input" 
                            placeholder="Contraseña" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="create-account" onClick={handleRegisterClick}>Registrarse</button>
                        <p className="subtitle">
                            Si ya tienes cuenta, puedes iniciar sesión:
                        </p>
                        <button className="create-account" onClick={handleLoginClick}>Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;