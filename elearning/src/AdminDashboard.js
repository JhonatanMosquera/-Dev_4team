import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

function AdminDashboard() {
  // Estado para los cursos
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Agregar o editar curso
  const addCourse = (course) => {
    if (selectedCourse) {
      setCourses(courses.map(c => c.id === selectedCourse.id ? course : c));
      setSelectedCourse(null); // Reset after edit
    } else {
      setCourses([...courses, { ...course, id: Date.now() }]);
    }
  };

  // Eliminar curso
  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  // Editar curso
  const editCourse = (course) => {
    setSelectedCourse(course);
  };

  // Formulario para agregar/editar cursos
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
          setCourse({ ...course, image: reader.result }); // Guardar la imagen como base64
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
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Imagen del curso</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">
          {selectedCourse ? 'Actualizar curso' : 'Agregar curso'}
        </button>
      </form>
    );
  };

  // Lista de cursos
  const CourseList = ({ courses, onDelete, onEdit }) => {
    return (
      <div className="course-list">
        <h2>Gestión de cursos</h2>
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              {course.image && (
                <img src={course.image} alt={course.title} className="course-img"/>
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
          <img src="https://i.pinimg.com/564x/05/5a/91/055a91979264664a1ee12b9453610d82.jpg" alt="profile" height={150} width={150} className="profile-img" />
          <h2>Administrador</h2>
          <p>General</p>
        </div>
        <nav>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Ver cursos</a></li>
            <li><a href="#">Evaluaciones</a></li>
            <li><a href="#">Cerrar sesión</a></li>
          </ul>
        </nav>
      </aside>
      
      <main className="main-content">
        <div className="overview">
          <div className="balance-card">
            <div className="circle-chart">
              <p>Ver cursos</p>
            </div>
          </div>
          <div className="chart">
            <h3>Evaluaciones de los cursos</h3>
            <div className="bar-chart"></div>
          </div>
        </div>

        {/* Sección de Administración de Cursos */}
        <section className="course-management">
          <h2>Agregar cursos</h2>
          
          {/* Formulario para agregar/editar cursos */}
          <CourseForm selectedCourse={selectedCourse} onSubmit={addCourse} />

          {/* Lista de cursos */}
          <CourseList courses={courses} onDelete={deleteCourse} onEdit={editCourse} />
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
