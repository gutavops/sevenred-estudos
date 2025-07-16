import { Request, Response, NextFunction } from 'express';
import { createTransactionService, deleteTransactionService } from '../service/transactionService';
import { CreateTransactionDTO } from '../dto/transactionDTO';

// Criar uma transação
export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newTransaction = req.body as CreateTransactionDTO;
    const transactionCreated = await createTransactionService(newTransaction)
    res.status(201).json(transactionCreated);
  } catch (error) {
    next(error);
  }
}


// Deletar uma transação
export const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const transactionDeleted = await deleteTransactionService(id)
    res.json(transactionDeleted)
  } catch (error) {
    next(error)
  }
}