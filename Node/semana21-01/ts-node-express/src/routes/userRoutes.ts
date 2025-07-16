import { Router } from 'express';
import {
  createUser,
  getUsers,
  updateUser,
  getTransactionsByUser,
  getUserById,
  deleteUser,
} from '../controller/userController';

const router = Router();

router.get('/',   getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/transactions', getTransactionsByUser);


export default router;