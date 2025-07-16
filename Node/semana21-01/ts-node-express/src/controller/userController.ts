import { Request, Response, NextFunction } from 'express';
import { createUserService, deleteUserService, getUserByIDService, getUsersService, updateUserService } from '../service/userService';
import { CreateUserDTO } from '../dto/userDTO';
import { getTransactionsByUserService } from '../service/transactionService';
// Create an item
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body as CreateUserDTO;

    const userCreated = await createUserService(newUser)
    res.status(201).json(userCreated);
  } catch (error) {
    next(error);
  }
};

// Read all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsersService()
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Ler todos as transações
export const getTransactionsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id);
    const data = await getTransactionsByUserService(id)
    res.json(data); // Retorna todos as transações
  } catch (error) {
    next(error);
  }
}

// // Read single user
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await getUserByIDService(id)
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update an user
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as Partial<CreateUserDTO>;
    const id = String(req.params.id);

    const userUpdated= await updateUserService(id, user)
    res.status(200).json(userUpdated);

  } catch (error) {
    next(error);
  }
};

// // Delete an user
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const deletedItem = await deleteUserService(id);
    res.json(deletedItem);
  } catch (error) {
    next(error);
  }
};