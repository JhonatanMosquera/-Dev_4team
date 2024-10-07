import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const registeredUsers = [
  //   { email: "user@example.com", password: "password123" },
  //   { email: "ramoz@gmail.com", password: "1234" },
  // ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Ingrese un correo válido.");
      return;
    }

    try {
      // Envía la solicitud POST al backend
      const response = await axios.post('http://localhost:3001/User/login', {
        
        email: email,
        password: password,
      }, { withCredentials: true });

      // Si la solicitud es exitosa, navega al home
      if (response.data.token) {
        // Guardar el token en localStorage o usarlo como prefieras
        localStorage.setItem('token', response.data.token);
        navigate('/home'); // Cambia la ruta si el login es exitoso
      } else {
        setError(response.data.message || "Correo o contraseña incorrectos.");
      }
    } catch (error) {
      setError("Ocurrió un error al intentar iniciar sesión.");
      console.error(error);
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Ingresar a tu cuenta!</h2>
        <div className="form-group">
          <label>Correo electrónico*</label>
          <input 
            type="text" 
            placeholder="Correo" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        {error && <div className="error-box"><p className="error-message">{error}</p></div>}
        <div className="form-group">
  <label htmlFor="password">Contraseña*</label>
  <input
    type="password"
    id="password" // Asegúrate de incluir un id que coincida con htmlFor en el label
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
</div>

        <button type="submit" className="btn-login">Ingresar</button>
        <div className="links">
          <button onClick={handleRegisterClick} style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>¿No tienes una cuenta?</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;