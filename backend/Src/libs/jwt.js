import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js'; // Asegúrate de que la ruta sea correcta

// Función para generar un token
export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, gmail: user.email, role: user.role },
    TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

// Función para verificar un token
export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
