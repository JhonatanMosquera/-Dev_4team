import { pool } from "../db.js";
import { cloudinary } from "../config.js";

export const CreateCurso = async (req, res) => {
  try {
    const { title, description, instructor_id } = req.body;

    // Verificar datos requeridos
    if (!title || !description || !instructor_id) {
      console.log("Datos faltantes:", { title, description, instructor_id });
      return res.status(400).json({ message: "Faltan datos requeridos." });
    }

    // Verificar imagen
    if (!req.file) {
      console.log("Imagen faltante:", req.file);
      return res.status(400).json({ message: "Falta la imagen." });
    }

    // Subir imagen a Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(( result,error) => {
        if (error) {
          console.error("Error al subir la imagen:", error);
          return reject(error); // Solo rechaza si hay un error
        }
        
        // Si no hay error, resuelve con el resultado
        resolve(result);
      });
    
      // Asegúrate de que esta línea esté fuera del bloque de manejo de errores
      uploadStream.end(req.file.buffer); // Finaliza la carga
    });
    
    
    
    const imageUrl = result.secure_url;
   

    // Intento de inserción en la base de datos
    try {
      const { rows } = await pool.query(
        "INSERT INTO courses(title, description, image_url, instructor_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, imageUrl, instructor_id]
      );
      const cursoCreado = rows[0];
      console.log("Curso creado exitosamente:", cursoCreado);
      return res.status(201).json(cursoCreado);
    } catch (dbError) {
      console.error("Error al insertar en la base de datos:", dbError.message);
      return res.status(500).json({ message: "Error al guardar el curso en la base de datos" });
    }
  } catch (error) {
    console.error("Error en el proceso de creación del curso:", error.message || error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};


export const GetCursos = async (req, res) => {
  try {
    // Obtener todos los cursos de la base de datos
    const { rows } = await pool.query("SELECT * FROM courses");

    // Si no se encuentran cursos, devolver una respuesta adecuada
    if (rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron cursos." });
    }

    // Retornar los cursos obtenidos
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error); // Loguear el error para depuración
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
