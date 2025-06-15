import { Router } from 'express';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} from '../controller/userController'; 

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser);

export default router;
