import dotenv from 'dotenv';
import * as cloudinary from 'cloudinary';
//libreria para leer variables de entorno
dotenv.config();

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
  
  // Exporta cloudinary y las variables de entorno
  export { cloudinary };
export const DB_USER = process.env.DB_USER
export const DB_HOST = process.env.DB_HOST
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_PORT = process.env.DB_PORT

export const TOKEN_SECRET = 'some secret key'
export const Port = process.env.Port||3001;