import React, { useState, useEffect } from 'react';
import './style/AdminDashboard.css';
import ViewCourses from './ViewCourses';

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [view, setView] = useState('dashboard');
  const [loading, setLoading] = useState(true); // Estado de carga
  const token = localStorage.getItem('token');
  
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64').toString('utf-8');
  const jsonPayload = JSON.parse(payload);
  const id = jsonPayload.id;

  useEffect(() => {
    fetchCourses();
  }, []);

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

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/'; 
  };

  const addCourse = async (course, image) => {
    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('instructor_id', id); // Agregar el ID del instructor
    formData.append('image_url', image); // Agregar la imagen
    
    try {
      const url = selectedCourse
        ? `https://dev-4team.onrender.com/admin/update-curso/${course.id}` // Ruta para actualizar
        : 'https://dev-4team.onrender.com/admin/add-curso'; // Ruta para agregar
  
      const method = selectedCourse ? 'PUT' : 'POST'; // Método PUT si estamos actualizando
  
      const response = await fetch(url, {
        method: method,
        body: formData,
      });
  
      if (response.ok) {
        fetchCourses(); // Recargar los cursos después de agregar/editar
        setSelectedCourse(null); // Limpiar la selección del curso
      }
    } catch (error) {
      console.error("Error al agregar/editar el curso:", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await fetch(`https://dev-4team.onrender.com/admin/delete-curso/${id}`, {
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
        setCourse({ 
          title: selectedCourse.title, 
          description: selectedCourse.description,
          image: null,  // Asegúrate de que la imagen se reestablezca al editar
          id: selectedCourse.id,
        });
      }
    }, [selectedCourse]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setCourse({ ...course, [name]: value });
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setCourse({ ...course, image: file }); // Guardar el archivo de imagen
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(course, course.image); // Pasar tanto los datos del curso como la imagen
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
        {selectedCourse && (
          <input type="hidden" name="id" value={selectedCourse.id} />
        )}
        <button type="submit">{selectedCourse ? 'Actualizar curso' : 'Agregar curso'}</button>
      </form>
    );
  };

  const CourseList = ({ courses, onDelete, onEdit }) => {
    if (courses.length === 0) {
      return <p>No hay cursos disponibles.</p>; // Mostrar mensaje cuando no hay cursos
    }

    return (
      <div className="course-list">
        <h2>Gestión de cursos</h2>
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {course.image && (
                <img src={course.image} alt={course.title} className="course-img" />
              )}
              <strong>{course.title}</strong> {course.description}
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
        </div>
        <nav>
          <ul>
            <li><a href="#" onClick={() => setView('dashboard')}>Dashboard</a></li>
            <li><a href="#" onClick={() => setView('viewCourses')}>Ver cursos</a></li>
            <li><a href="#" onClick={handleLogout}>Cerrar sesión</a></li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        {loading ? (
          <p>Cargando cursos...</p> // Mostrar mensaje mientras se cargan los cursos
        ) : view === 'dashboard' ? (
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
        ) : (
          <ViewCourses courses={courses} onDelete={deleteCourse} onEdit={setSelectedCourse} />
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
