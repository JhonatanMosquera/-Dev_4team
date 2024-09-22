import React from 'react';

const Home = () => {
  const userName = localStorage.getItem('userName');

  return (
    <div className="home-container">
      <h1>Bienvenido, {userName}!</h1>
      <p>Gracias por registrarte. Disfruta de nuestros cursos.</p>
    </div>
  );
};

export default Home;
