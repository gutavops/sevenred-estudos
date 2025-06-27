import { Request, Response, NextFunction } from 'express';
import { getTransactionsService, createTransactionService, deleteTransactionService } from '../service/transactionService';
import { CreateTransactionDTO } from '../dto/transactionDTO';

// Ler todos as transações
export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await getTransactionsService()
    res.json(data); // Retorna todos as transações
  } catch (error) {
    next(error);
  }
}

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
    const id = parseInt(req.params.id, 10);
    const transactionDeleted = await deleteTransactionService(id)
    res.json(transactionDeleted)
  } catch (error) {
    next(error)
  }
} 