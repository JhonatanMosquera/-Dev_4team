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
            <h1 className='text'>EduSmart</h1>
        </div>
        <div className='nav-links'>
          <button className="create-account" onClick={handleLoginClick}>Inicar sesión</button>
          <button className="create-account" onClick={handleRegisterClick}>Registrarse</button>
        </div>
      </nav>

      <section className="main-section">
        <div className="text-content">
          <h1>¡Encuentra los cursos que más te gusten!</h1>
          <p>Encuentra los cursos que más te gusten y comienza a aprender a tu ritmo. Explora una amplia variedad de temas, desde tecnología y negocios hasta arte y desarrollo personal. Con cursos diseñados para todos los niveles, puedes mejorar tus habilidades y alcanzar tus metas de forma flexible y personalizada.</p>
        </div>
        <div className="image-section">
          <img src="/principal.jpg" alt="Tutor" className="" />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;