import React, { useState, useEffect } from 'react';
import './style/CoursesUser.css';

function CoursesView() {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('token');
  
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64').toString('utf-8');
  const jsonPayload = JSON.parse(payload);
  const id = jsonPayload.id;

  // Obtener la lista de cursos desde el backend
  useEffect(() => {
    fetchCourses();
  }, []);

  // Función para obtener los cursos desde el backend
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/all-curso');
      const data = await response.json();
      setCourses(data);  // Guardamos los cursos obtenidos en el estado
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  const enrollInCourse = async (courseId) => {
    const dataToSend = {
      courses: courses,
      id: id
    };
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/login';  // Redirige al login si no hay token
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/user/new-registerCurso`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },body: JSON.stringify(dataToSend) // Convertimos los datos a JSON
      });
      console.log(response)
      if (response.ok) {
        alert('Inscripción exitosa!');
      } else {
        alert('Hubo un error al inscribirse en el curso.');
      }
    } catch (error) {
      console.error("Error al inscribir al curso:", error);
    }
  };

  return (
    <div className="courses-view">
      <h1>Cursos Disponibles</h1>

      <div className="courses-list">
        {courses.length === 0 ? (
          <p>Cargando cursos...</p>
        ) : (
          courses.map(course => (
            <div key={course.id} className="course-card">
              <img src={course.image} alt={course.title} className="course-image" />
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <button onClick={() => enrollInCourse(course.id)}>Inscribirse</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CoursesView;
