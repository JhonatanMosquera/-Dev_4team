import dotenv from 'dotenv';
//libreria para leer variables de entorno
dotenv.config();

export const DB_USER = process.env.DB_USER
export const DB_HOST = process.env.DB_HOST
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE
export const DB_PORT = process.env.DB_PORT

export const TOKEN_SECRET = 'some secret key'
export const Port = process.env.Port||3001;