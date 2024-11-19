import React, { useState, useEffect } from 'react';
import './style/ViewCourses.css';

function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
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
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      const response = await fetch(`https://dev-4team.onrender.com/admin/delete-curso/${courseId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCourses(courses.filter(course => course.id !== courseId)); // Actualizar la lista de cursos
        alert('Curso eliminado con éxito');
      } else {
        alert('Error al eliminar el curso');
      }
    } catch (error) {
      console.error("Error al eliminar el curso:", error);
      alert('Error al eliminar el curso');
    }
  };

  const handleEdit = (courseId) => {
    console.log("Editar curso con ID:", courseId);
    // Redirigir o abrir un formulario de edición para el curso
  };

  return (
    <div className="view-courses">
      <h2>Lista de Cursos</h2>
      {loading ? (
        <p>Cargando cursos...</p> // Mensaje de carga
      ) : courses.length === 0 ? (
        <p>No hay cursos disponibles</p> // Mensaje cuando no hay cursos
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id} className="course-item">
              <img src={course.image_url} alt={course.title} className="course-img" />
              <div>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </div>
              <div className="course-actions">
                <button onClick={() => handleDelete(course.id)} className="delete-btn">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewCourses;
