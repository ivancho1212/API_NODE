// personStatus.router.js
import { Router } from 'express';
import { showPersonStatus, createPersonStatus, updatePersonStatus, showIdPersonStatus, deletePersonStatus } from '../controllers/personStatus.controller.js';

const router = Router();

router.get('/personStatus', showPersonStatus);
router.get('/personStatus/:id', showIdPersonStatus);
router.post('/personStatus', createPersonStatus);
router.put('/personStatus/:id', updatePersonStatus);
router.delete('/personStatus/:id', deletePersonStatus);

export default router;


