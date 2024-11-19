import React, { useState, useEffect } from 'react';
import './style/CoursesUser.css';

function CoursesView() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
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
    setLoading(true); // Iniciar carga
    try {

      const response = await fetch('https://dev-4team.onrender.com/admin/all-curso');

      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []); // Asegura que sea un array
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      setCourses([]); // En caso de error, asigna un array vacío
    } finally {
      setLoading(false); // Finalizar carga
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

      const response = await fetch(`https://dev-4team.onrender.com/user/new-registerCurso`, {

        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend) // Convertimos los datos a JSON
      });

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
        {loading ? (
          <p>Cargando cursos...</p> // Mensaje de carga
        ) : courses.length === 0 ? (
          <p>No hay cursos disponibles</p> // Mensaje cuando no hay cursos
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

