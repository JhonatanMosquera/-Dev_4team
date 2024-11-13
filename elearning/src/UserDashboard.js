import React, { useState, useEffect } from 'react';
import './style/User.css';
import CoursesUser from './CoursesUser';

function UserDashboard() {
  const [courses, setCourses] = useState([]);
  const [view, setView] = useState('dashboard');
  const [id, setId] = useState(5);
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/all-curso');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.href = '/login'; 
  };

  // Función para inscribir al usuario en un curso
  const enrollInCourse = async (courseId) => {
    const dataToSend = {
      course_id: courseId,
      user_id: id
    };
    try {
      const response = await fetch(`http://localhost:3001/user/new-registerCurso`, {
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json',
        },body: JSON.stringify(dataToSend) // Convertimos los datos a JSON
      });
      if (response.ok) {
        alert('Inscripción exitosa!');
        // Puedes agregar aquí una lógica para actualizar el estado si es necesario
      }
    } catch (error) {
      console.error("Error al inscribir al curso:", error);
    }
  };

  const CourseList = ({ courses, onEnroll }) => {
    return (
      <div className="course-list">
        <h2>Cursos disponibles</h2>
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {course.image_url && (
                <img src={course.image_url} alt={course.title} className="course-img" />
              )}
              <strong>{course.title}</strong>  {course.description}
              {/* Solo mostramos el botón de inscripción */}
              <button onClick={() => onEnroll(course.id)}>Inscribirse</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="profile">
          <img src="https://i.pinimg.com/564x/05/5a/91/055a91979264664a1ee12b9453610d82.jpg" alt="profile" height={150} width={150} className="profile-img" />
          <h2>Usuario</h2>
        </div>
        <nav>
          <ul>
            {/* <li><a href="#" onClick={() => setView('dashboard')}>Dashboard</a></li> */}
            <li><a href="#" onClick={() => setView('CoursesUser')}>Cursos disponibles</a></li>
            <li><a href="#" onClick={() => setView('UserDashboard')}>Mis cursos</a></li>
            <li><a href="#" onClick={handleLogout}>Cerrar sesión</a></li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        {view === 'dashboard' && (
          <>
            <div className="overview">
              <div className="balance-card">
                <div className="circle-chart">
                  <p>Bienvenido al Dashboard</p>
                </div>
              </div>
              <div className="chart">
                <h3>Evaluaciones de los cursos</h3>
                <div className="bar-chart"></div>
              </div>
            </div>
          </>
        )}

        {view === 'CoursesUser' && (
          <CourseList courses={courses} onEnroll={enrollInCourse} />
        )}
      </main>
    </div>
  );
}

export default UserDashboard;