import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:3001/User/login', {
        email: email,
        password: password,
      }, { withCredentials: true });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
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
          <label htmlFor="email">Correo electrónico*</label>
          <input 
            type="text" 
            id="email" // Asegúrate de incluir un id que coincida con htmlFor en el label
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
            id="password"
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