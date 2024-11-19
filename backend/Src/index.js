import express from 'express'
import morgan from 'morgan'
import { Port } from './config.js';
import userRoutes from './routes/authentication.routes.js';
import adminRoutes from './routes/admin.routes.js';
import user from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from 'path';

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://e-learning-gfqd.onrender.com'],
  credentials: true, // Permitir envío de credenciales (cookies, cabeceras de autorización, etc.)
}));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());

// Rutas de la API
app.use('/User', userRoutes);
app.use('/admin', adminRoutes);
app.use('/User', user);

// Sirve los archivos estáticos de React (carpeta 'build')
app.use(express.static(path.join(__dirname, 'build')));

// Redirige todas las demás rutas (front-end) al archivo 'index.html' de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Inicia el servidor
app.listen(Port, () => {
  console.log(`Corriendo en el puerto ${Port}`);
});
