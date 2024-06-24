// personStatus.router.js
import { Router } from 'express';
import { showPersonStatus, createPersonStatus, updatePersonStatus, deletePersonStatus } from '../controllers/personStatus.controller.js';

const router = Router();

router.get('/personStatus', showPersonStatus);
router.get('/personStatus/:id', showPersonStatus);
router.post('/personStatus', createPersonStatus);
router.put('/personStatus/:id', updatePersonStatus);
router.delete('/personStatus/:id', deletePersonStatus);

export default router;


