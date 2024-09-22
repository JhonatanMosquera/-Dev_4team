import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Ingresar a tu cuenta!</h2>
        <div className="form-group">
          <label>Nombre de usuario*</label>
          <input 
            type="text" 
            placeholder="Nombre de usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Contraseña*</label>
          <input 
            type="Contraseña" 
            placeholder="Ingresa tu contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn-login">Ingresar</button>
        <button type="submit" className="btn-login">Registrarse</button>
        <div className="login-options">
          <a href="#">¿No tienes una cuenta?</a>
          <a href="#">¿Se te olvidó tu contraseña?</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;