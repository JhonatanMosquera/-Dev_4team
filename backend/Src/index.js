import express from 'express'
import morgan from 'morgan'
import { Port } from './config.js';
import  userRoutes from './routes/authentication.routes.js';
import  adminRoutes from './routes/admin.routes.js';
import  user from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();


//Middleware
//app.use(cors());

// Permite solicitudes desde cualquier origen
app.use(cors({
  origin: ['http://localhost:3000', 'https://e-learning-eax8.onrender.com'],
  credentials: true, // Permitir envío de credenciales (cookies, cabeceras de autorización, etc.)
}));

app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json())
app.use('/User',userRoutes)
app.use('/admin',adminRoutes)
app.use('/User',user)




app.listen(Port)
console.log(`Corriendo en el puerto ${Port}`)