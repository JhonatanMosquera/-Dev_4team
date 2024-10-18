import React from 'react';

function UserDashboard() {
  const courses = [
    { id: 1, title: "Curso de React", description: "Aprende los fundamentos de React." },
    { id: 2, title: "Curso de JavaScript", description: "Domina JavaScript desde cero." },
    { id: 3, title: "Curso de Python", description: "Introducción a la programación con Python." },
  ];

  return (
    <div>
      <h1>Panel de Usuario</h1>
      <h2>Cursos Disponibles</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <strong>{course.title}</strong> - {course.description}
            <button>Inscribirse</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDashboard;
