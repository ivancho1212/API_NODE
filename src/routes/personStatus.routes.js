// personStatus.router.js
import { Router } from 'express';
import { showPersonStatus, createPersonStatus, updatePersonStatus, deletePersonStatus } from '../controllers/personStatus.controller.js';

const router = Router();

router.get('/personStatus', showPersonStatus);
router.post('/personStatus', createPersonStatus);
router.put('/personStatus', updatePersonStatus);
router.delete('/personStatus', deletePersonStatus);

export default router;