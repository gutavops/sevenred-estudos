import { Router } from 'express';
import {
  createUser,
  getUsers,
   updateUser,
   deleteUser,
   getUserById
} from '../controller/userController'; 

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser);
router.get('/:id', getUserById);

export default router;
