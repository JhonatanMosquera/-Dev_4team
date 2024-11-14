import React, { useState, useEffect } from 'react';
import './style/MyCourses.css';

function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);  // Nuevo estado para la carga de los datos
  
  const token = localStorage.getItem('token');
  
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64').toString('utf-8');
  const jsonPayload = JSON.parse(payload);
  const id = jsonPayload.id;
  useEffect(() => {
    fetchUserCourses();
  }, []);

  const fetchUserCourses = async () => {
    try {
      console.log(id)
      const userId = 5; // ID del usuario, reemplaza este valor con el ID correcto
      const response = await fetch(`http://localhost:3001/user/My-course/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      setEnrolledCourses(data);
    } catch (error) {
      console.error("Error al obtener los cursos del usuario:", error);
    } finally {
      setLoading(false);  // Cambiar el estado de carga cuando se termine la solicitud
    }
  };

  return (
    <div className="my-courses">
      <h2>Mis Cursos</h2>
      {loading ? (  // Mostrar mensaje de carga
        <p>Cargando cursos...</p>
      ) : (
        <ul>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map(course => (
              <li key={course.id}>
                {course.image_url && (
                  <img src={course.image_url} alt={course.title} className="course-img" />
                )}
                <div className="course-info">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No tienes cursos matriculados.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default MyCourses;

