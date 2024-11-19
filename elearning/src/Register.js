import React, { useState } from "react"; 
import './style/Register.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = async (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto del formulario
        setError(''); // Limpiar el mensaje de error

        // Validar que los campos no estén vacíos
        if (!name || !email || !password) {
            setError("Por favor, complete todos los campos.");
            return;
        }

        // Expresión regular para validar el correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Por favor, ingrese un correo electrónico válido.");
            return;
        }
        
        try {
            // Enviar datos al backend usando axios
            const response = await axios.post('https://dev-4team.onrender.com/User/createUser', {
                name,
                email,
                password 
            });
    
            // Verificar si la respuesta fue exitosa
            if (response.status === 201) {
                // Guardar el nombre en localStorage
                localStorage.setItem('userName', name);
                // Redirigir al home
                navigate('/UserDashboard');
            } else {
                setError('Error al registrarse. Intente nuevamente.');
            }
        } catch (error) {
            setError('Hubo un error al conectar con el servidor. Intente más tarde.');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="wrapper">
                <div className="right">
                    <h1 className="title">Crear una cuenta</h1>
                    <p className="text">Usa tu correo para registrarte</p>
                    {error && <div className="error-box"><p className="error-message">{error}</p></div>} {/* Mostrar mensaje de error */}
                    <form className="form">
                        <label htmlFor="name">Nombre*</label>
                        <input 
                            id="name" // Agregar id para asociar con el label
                            className="input" 
                            placeholder="Nombre completo" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="email">Correo*</label>
                        <input 
                            id="email" // Agregar id para asociar con el label
                            className="input" 
                            placeholder="Correo electrónico" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password">Contraseña*</label>
                        <input 
                            id="password" // Agregar id para asociar con el label
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