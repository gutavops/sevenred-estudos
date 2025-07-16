import { Router } from 'express';
import {
  createTransaction,
  deleteTransaction,
} from '../controller/transactionController'; 

const router = Router();

router.post('/', createTransaction);
router.delete('/:id', deleteTransaction);

export default router;