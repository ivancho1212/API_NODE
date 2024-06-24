// role.router.js
import { Router } from 'express';
import { showRole, showIdRole, createRole, updateRole, deleteRole } from '../controllers/role.controller.js';

const router = Router();

router.get('/role', showRole);
router.get('/role/:id', showIdRole);
router.post('/role', createRole);
router.put('/role/:id', updateRole); 
router.delete('/role/:id', deleteRole); 

export default router;