import { Router } from 'express';
import {RegisterCurso,getUserCourses} from '../controllers/user.controllers.js'

const router = Router();

router.post('/new-registerCurso', RegisterCurso);
router.get('/My-course/:user_id', getUserCourses)
// router.delete('/delete-curso/:id',deleteCursos)
// router.put('/update-curso/:id',upload.single('image_url'),updateCurso)
// router.get('/curso/:id', getCurso)
export default router;