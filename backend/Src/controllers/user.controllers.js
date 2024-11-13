import { pool } from "../db.js";

export const RegisterCurso = async (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    // Verificar datos requeridos
    if (!user_id || !course_id) {
      console.log("Datos faltantes:", { user_id, course_id });
      return res.status(400).json({ message: "Faltan datos requeridos." });
    }

      // Verificar si el usuario existe
      const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);
      if (userCheck.rows.length === 0) {
        return res.status(400).json({ message: "El usuario no existe." });
      }
  
      // Verificar si el curso existe
      const courseCheck = await pool.query("SELECT * FROM courses WHERE id = $1", [course_id]);
      if (courseCheck.rows.length === 0) {
        return res.status(400).json({ message: "El curso no existe." });
      }
    // Insertar datos en la base de datos
    const { rows } = await pool.query(
      "INSERT INTO enrollments(user_id, course_id) VALUES ($1, $2) RETURNING *",
      [user_id, course_id]
    );
    const RegistroCreado = rows[0];
    console.log("Registro Creado exitosamente:", RegistroCreado);
    return res.status(201).json(RegistroCreado);

  } catch (dbError) {
    console.error("Error al insertar en la base de datos:", dbError.message);
    return res.status(500).json({ message: "Error al guardar el curso en la base de datos" });
  }
};

export const getUserCourses = async (req, res) => {
    try {
      const { user_id } = req.body;
  
      // Verificar que el user_id esté presente
      if (!user_id) {
        return res.status(400).json({ message: "Falta el ID del usuario." });
      }
  
      // Consulta para obtener los cursos en los que el usuario está inscrito
      const { rows: courses } = await pool.query(
        `
        SELECT courses.id, courses.title, courses.description, courses.image_url, courses.created_at
        FROM enrollments
        JOIN courses ON enrollments.course_id = courses.id
        WHERE enrollments.user_id = $1
        `,
        [user_id]
      );
  
      // Comprobar si el usuario no tiene cursos inscritos
      if (courses.length === 0) {
        return res.status(404).json({ message: "El usuario no está inscrito en ningún curso." });
      }
  
      // Devolver los cursos encontrados
      return res.status(200).json(courses);
    } catch (error) {
      console.error("Error al obtener los cursos del usuario:", error.message);
      return res.status(500).json({ message: "Error al obtener los cursos del usuario" });
    }
  };