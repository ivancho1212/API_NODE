import { Router } from 'express';
import { showPerson, showPersonId, createPerson, updatePerson, deletePerson, LoginPerson } from '../controllers/person.controller.js';
import PersonScheme from '../schemes/person.schema.js';
import personMiddleware from '../middlewares/person.middleware.js';
import verifyToken from '../middlewares/jwt.middleware.js';

const router = Router();

router.post('/person', personMiddleware(PersonScheme.createPerson), createPerson);
router.get('/person', verifyToken, showPerson);
router.get('/person/:id', verifyToken, showPersonId); // Corrige la ruta para aceptar :id
router.put('/person/:id', verifyToken, personMiddleware(PersonScheme.createPerson), updatePerson); // Corrige la ruta para aceptar :id
router.delete('/person/:id', verifyToken, deletePerson); // Corrige la ruta para aceptar :id
router.post('/person/login', LoginPerson); // Añadimos la ruta de login

export default router;
