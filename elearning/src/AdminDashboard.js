import React, { useState, useEffect } from 'react';
import './style/AdminDashboard.css';
import ViewCourses from './ViewCourses';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [view, setView] = useState('dashboard');

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

  const addCourse = async (course) => {
    try {
      const response = selectedCourse
        ? await fetch('http://localhost:3001/admin/add-curso', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(course),
          })
        : await fetch('http://localhost:3001/admin/add-curso', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...course, id: Date.now() }),
          });

      if (response.ok) {
        fetchCourses();
        setSelectedCourse(null);
      }
    } catch (error) {
      console.error("Error al agregar/editar el curso:", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/admin/delete-curso/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
    }
  };

  const CourseForm = ({ selectedCourse, onSubmit }) => {
    const [course, setCourse] = useState({ title: '', description: '', image: null });

    useEffect(() => {
      if (selectedCourse) {
        setCourse(selectedCourse);
      }
    }, [selectedCourse]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setCourse({ ...course, [name]: value });
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCourse({ ...course, image: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(course);
      setCourse({ title: '', description: '', image: null });
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input type="text" name="title" value={course.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Descripción</label>
          <textarea name="description" value={course.description} onChange={handleChange} required />
        </div>
        <div>
          <label>Imagen del curso</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button type="submit">{selectedCourse ? 'Actualizar curso' : 'Agregar curso'}</button>
      </form>
    );
  };

  const CourseList = ({ courses, onDelete, onEdit }) => {
    return (
      <div className="course-list">
        <h2>Gestión de cursos</h2>
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {course.image && (
                <img src={course.image} alt={course.title} className="course-img" />
              )}
              <strong>{course.title}</strong> - {course.description}
              <button onClick={() => onEdit(course)}>Editar</button>
              <button className="delete-button" onClick={() => onDelete(course.id)}>Eliminar</button>
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
          <img src="/Admin.jpg" alt="profile" height={150} width={150} className="profile-img" />
          <h2>Administrador</h2>
          <p>General</p>
        </div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => setView('dashboard')}>Dashboard</a></li>
            <li><a href="#" onClick={() => setView('viewCourses')}>Ver cursos</a></li>
            <li><a href="#">Evaluaciones</a></li>
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

            <section className="course-management">
              <h2>Agregar cursos</h2>
              <CourseForm selectedCourse={selectedCourse} onSubmit={addCourse} />
              <CourseList courses={courses} onDelete={deleteCourse} onEdit={setSelectedCourse} />
            </section>
          </>
        )}

        {view === 'viewCourses' && (
          <ViewCourses courses={courses} onDelete={deleteCourse} onEdit={setSelectedCourse} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;