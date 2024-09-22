import express from 'express'
import morgan from 'morgan'
import { Port } from './config.js';
import  userRoutes from './routes/authentication.routes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors"

const app = express();


//Middleware
//app.use(cors());

// Permite solicitudes desde cualquier origen
app.use(cors({
    origin: 'http://localhost:3000', // Especifica el origen permitido
    credentials: true, // Permitir envío de credenciales (cookies, cabeceras de autorización, etc.)
  }));
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json())
app.use('/User',userRoutes)




app.listen(Port)
console.log(`Corriendo en el puerto ${Port}`)