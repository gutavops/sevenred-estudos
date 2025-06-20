import { Request, Response, NextFunction } from 'express';
import { createUserService, deleteUserService, getUserByIDService, getUsersService, updateUserService } from '../service/userService';
import { CreateUserDTO } from '../dto/userDTO';

// Criar um novo usuário
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = req.body as CreateUserDTO;
    const userCreated = await createUserService(newUser)
    res.status(201).json(userCreated); // Retorna o usuário criado com status 201 (Created)
  } catch (error) {
    next(error); // Passa qualquer erro para o próximo middleware de tratamento de erros
  }
};

// Ler todos os usuários
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsersService()
    res.json(users); // Retorna todos os usuários
  } catch (error) {
    next(error);
  }
};

// Deletar um usuário
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const userDeleted = await deleteUserService(id)
        res.json(userDeleted)
    } catch (error) {
        next(error)
    }
} 

// Atualizar um usuário existente
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        const userData: Partial<CreateUserDTO> = req.body
        const userUpdated = await updateUserService(id, userData)
        res.json(userUpdated)
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10); 
      const user = await getUserByIDService(id); 
      res.json(user); 
    } catch (error) {
      next(error);
    }
  };