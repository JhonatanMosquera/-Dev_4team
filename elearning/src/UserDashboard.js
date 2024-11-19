import React, { useState, useEffect } from 'react';
import './style/User.css';
import CoursesUser from './CoursesUser';
import MyCourses from './MyCourses'; // Importa el componente MyCourses

function UserDashboard() {
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState('MyCourses'); // Cambia 'dashboard' por 'MyCourses'
  const [id, setId] = useState(5);
  const [loading, setLoading] = useState(true); // Estado de carga

  const token = localStorage.getItem('token');
  
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64').toString('utf-8');
  const jsonPayload = JSON.parse(payload);
  const user_ids = jsonPayload.id;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true); // Inicia la carga
    try {

      const response = await fetch('https://dev-4team.onrender.com/admin/all-curso');

      const data = await response.json();
      setCourses(Array.isArray(data) ? data : []); // Asegura que data sea un array
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
      setCourses([]); // En caso de error, asigna un array vacío
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login'; 
  };

  const enrollInCourse = async (courseId) => {
    const dataToSend = {
      course_id: courseId,

      user_id: user_ids
    };
    try {
      const response = await fetch('https://dev-4team.onrender.com/user/new-registerCurso', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });
      if (response.ok) {
        alert('Inscripción exitosa!');
      }
    } catch (error) {
      console.error("Error al inscribir al curso:", error);
    }
  };

  const CourseList = ({ courses, onEnroll }) => (
    <div className="course-list">
      <h2>Cursos disponibles</h2>
      {courses.length === 0 ? (
        <p>No hay cursos disponibles</p> // Mensaje cuando no hay cursos
      ) : (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {course.image_url && (
                <img src={course.image_url} alt={course.title} className="course-img" />
              )}
              <strong>{course.title}</strong> {course.description}
              <button onClick={() => onEnroll(course.id)}>Inscribirse</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <img src="https://i.pinimg.com/564x/05/5a/91/055a91979264664a1ee12b9453610d82.jpg" alt="profile" height={150} width={150} className="profile-img" />
          <h2>Usuario</h2>
        </div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => setView('CoursesUser')}>Cursos disponibles</a></li>
            <li><a href="#" onClick={() => setView('MyCourses')}>Mis cursos</a></li>
            <li><a href="#" onClick={handleLogout}>Cerrar sesión</a></li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        {loading ? (
          <p>Cargando...</p> // Mensaje de carga
        ) : view === 'CoursesUser' ? (
          <CourseList courses={courses} onEnroll={enrollInCourse} />
        ) : (
          <MyCourses /> // Renderiza MyCourses cuando el estado view es 'MyCourses'
        )}
      </main>
    </div>
  );
}

export default UserDashboard;
