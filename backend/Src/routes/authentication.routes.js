import { Router } from 'express';
import { getUsers,createUser,loginUser,logout } from '../controllers/auth.controllers.js'; 
import { validateSchema } from "../middlewares/validates.campos.js"
import { registerSchema,LoginSchema } from "../schemas/auth.schemas.js"
import {authRequired} from '../middlewares/validates.token.js'

const router = Router();

// Rutas
router.post("/login",validateSchema(LoginSchema),loginUser);
router.post("/CreateUser", validateSchema(registerSchema) ,createUser);
router.post('/logout', logout)
router.get("/profile", authRequired ,getUsers);

export default router;
