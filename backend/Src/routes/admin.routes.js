    import { Router } from 'express';
    import {CreateCurso,GetCursos,deleteCursos,updateCurso,getCurso} from '../controllers/admin.controller.js'
    import multer from 'multer';

    // Configuración de multer para guardar en memoria temporal
    const storage = multer.memoryStorage();
    const upload = multer({
        storage: storage,
        limits: {
          fileSize: 1 * 1024 * 1024, // Límite de tamaño de archivo: 1 MB
        
        },
      });
      
    const router = Router();

    router.post('/add-curso', upload.single('image_url'), CreateCurso); // Asegúrate de que este nombre sea el correcto
    router.get('/all-curso', GetCursos)
    router.delete('/delete-curso/:id',deleteCursos)
    router.put('/update-curso/:id',upload.single('image_url'),updateCurso)
    router.get('/curso/:id', getCurso)
    export default router;