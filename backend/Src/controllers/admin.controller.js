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
      return res.status(404).json({ message: "No se encontraron cursos creados." });
    }

    // Retornar los cursos obtenidos
    return res.status(200).json(rows);
  } catch (error) {
    console.error(error); // Loguear el error para depuración
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const deleteCursos = async (req, res) => {
  try {
    const { id } = req.params;

    // Primero, obtener la URL de la imagen del curso
    const { rows: courseRows } = await pool.query("SELECT image_url FROM courses WHERE id = $1", [id]);

    // Si no se encuentra el curso, devolver un mensaje adecuado
    if (courseRows.length === 0) {
      return res.status(404).json({ message: "Curso no encontrado." });
    }

    const imageUrl = courseRows[0].image_url;

    // Extraer el ID de la imagen de la URL (asumiendo que la URL tiene el formato de Cloudinary)
    const imageId = imageUrl ? imageUrl.split('/').pop().split('.')[0] : null;

    // Eliminar el registro del curso de la base de datos
    const { rowCount } = await pool.query("DELETE FROM courses WHERE id = $1", [id]);

    if (rowCount === 0) {
      return res.status(404).json({ message: "Curso no encontrado." });
    }

    // Si existe una imagen, eliminarla de Cloudinary
    if (imageId) {
      cloudinary.uploader.destroy(imageId, ( result,error) => {
        if (error) {
          console.error("Error al eliminar la imagen en Cloudinary:", error);
        } else {
          console.log("Imagen eliminada en Cloudinary:", result);
        }
      });
    }

    return res.status(202).json({ message: "Curso eliminado exitosamente." });
  } catch (error) {
    console.error(error); // Loguear el error para depuración
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};


export const updateCurso = async (req, res) => {
  try {
    const { id } = req.params; // El ID del curso a actualizar
    const { title, description } = req.body; // Datos a actualizar en el curso

    // Verificar datos requeridos
    if (!title && !description && !req.file) {
      return res.status(400).json({ message: "No hay datos para actualizar." });
    }

    // Almacenar la URL de la imagen si se proporciona
    let imageUrl;
    if (req.file) {
      // Subir imagen a Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream((result, error) => {
          if (error) {
            console.error("Error al subir la imagen:", error);
            return reject(error); // Rechaza si hay un error
          }
          // Resuelve con el resultado
          resolve(result);
        });
        
        // Finaliza la carga
        uploadStream.end(req.file.buffer); 
      });
      
      imageUrl = result.secure_url; // Guardar la URL de la imagen
    }

    // Consulta SQL para actualizar el curso de forma segura
    const { rowCount, rows } = await pool.query(
      `UPDATE courses
       SET title = COALESCE($1, title), description = COALESCE($2, description), image_url = COALESCE($3, image_url)
       WHERE id = $4
       RETURNING *`, 
      [title || null, description || null, imageUrl || null, id]
    );

    // Verificar si el curso fue encontrado y actualizado
    if (rowCount === 0) {
      return res.status(404).json({ message: "Curso no encontrado." });
    }

    // Retornar los datos del curso actualizado
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};


export const getCurso = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del curso de los parámetros de la URL

    // Consultar la base de datos para obtener el curso específico por ID
    const { rows } = await pool.query("SELECT title,description FROM courses WHERE id = $1", [id]);

    // Si no se encuentra el curso, devolver una respuesta adecuada
    if (rows.length === 0) {
      return res.status(404).json({ message: "Curso no encontrado." });
    }

    // Retornar el curso encontrado
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error); // Loguear el error para depuración
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
