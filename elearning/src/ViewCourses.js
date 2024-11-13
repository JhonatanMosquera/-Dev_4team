import React, { useState, useEffect } from 'react';
import './style/ViewCourses.css';

function ViewCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:3001/admin/all-curso');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      // Llamada para eliminar el curso
      const response = await fetch(`http://localhost:3001/admin/delete-curso/${courseId}`, {
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
    // Redirigir o abrir un formulario de edición para el curso
    console.log("Editar curso con ID:", courseId);
    // Puedes redirigir a una página de edición o mostrar un formulario
    // Por ejemplo, usando `navigate('/edit-course', { state: { courseId } })`
  };

  return (
    <div className="view-courses">
      <h2>Lista de Cursos</h2>
      {courses.length === 0 ? (
        <p>No hay cursos disponibles</p>
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
                {/* <button onClick={() => handleEdit(course.id)} className="edit-btn">Editar</button> */}
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