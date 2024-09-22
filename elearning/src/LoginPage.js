import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registeredUsers = [
    { email: "user@example.com", password: "password123" },
    { email: "ramoz@gmail.com", password: "1234" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (!username || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      setError("Ingrese un correo válido.");
      return;
    }

    const user = registeredUsers.find(user => user.email === username && user.password === password);
    if (!user) {
      setError("Correo o contraseña incorrectos.");
      return;
    }
    
    navigate('/home');
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
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        {error && <div className="error-box"><p className="error-message">{error}</p></div>}
        <div className="form-group">
          <label>Contraseña*</label>
          <input 
            type="password" 
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