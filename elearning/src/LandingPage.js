import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="logo">
            <img src="/logo1.png" alt="Logo" className="logo-image" />
            EduSmart / COLLEGE
        </div>
        <ul className="nav-links">
          <li>Inicio</li>
          <li>Cursos</li>
          <li>Precios</li>
          <li>Blog</li>
          <li>Contacto</li>
        </ul>
        <button className="create-account" onClick={handleLoginClick}>Inicar sesión</button>
        <button className="create-account" onClick={handleRegisterClick}>Registrarse</button>
      </nav>

      <section className="main-section">
        <div className="text-content">
          <h1>Encuentra el mejor tutor para ti</h1>
          <p>Reinventamos el aprendizaje para capacitar a los estudiantes y educadores para que prosperen en una sociedad interconectada.</p>
          <div className="email-form">
            <input type="email" placeholder="Ingresa tu correo electrónico" />
            <button>Empezar</button>
          </div>
        </div>

        <div className="image-section">
          <img src="/principal.jpg" alt="Tutor" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;