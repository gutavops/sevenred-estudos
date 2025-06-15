import { Request, Response, NextFunction } from 'express';
import { User, users } from '../models/user'; 

// Criar um novo usuário
export const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, cpf, phone, age } = req.body; // Desestrutura os dados do corpo da requisição
    
    // Gera um ID único baseado no timestamp atual
    const newId = Date.now(); 

    // Cria o novo objeto User
    const newUser: User = { 
      id: newId, 
      name, 
      email, 
      cpf, 
      phone, 
      age 
    }; 
    
    users.push(newUser); // Adiciona o novo usuário ao array de usuários
    res.status(201).json(newUser); // Retorna o usuário criado com status 201 (Created)
  } catch (error) {
    next(error); // Passa qualquer erro para o próximo middleware de tratamento de erros
  }
};

// Ler todos os usuários
export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(users); // Retorna todos os usuários
  } catch (error) {
    next(error);
  }
};

// Atualizar um usuário existente
export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10); // Obtém o ID do parâmetro da rota e converte para número
    const userIndex = users.findIndex((u) => u.id === id); // Encontra o índice do usuário no array

    if (userIndex === -1) {
      res.status(404).json({ message: 'Usuário não encontrado' }); // Se o usuário não for encontrado, retorna 404
      return;
    }

    // Desestrutura os dados atualizados do corpo da requisição
    const { name, email, cpf, phone, age } = req.body;

    // Atualiza as propriedades do usuário.
    // Acessa o usuário diretamente pelo índice e atualiza suas propriedades.
    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].cpf = cpf;
    users[userIndex].phone = phone;
    users[userIndex].age = age;

    res.json(users[userIndex]); // Retorna o usuário atualizado
  } catch (error) {
    next(error);
  }
};

// Deletar um usuário
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10); // Obtém o ID do parâmetro da rota
    const userIndex = users.findIndex((u) => u.id === id); // Encontra o índice do usuário

    if (userIndex === -1) {
      res.status(404).json({ message: 'Usuário não encontrado' }); // Se o usuário não for encontrado, retorna 404
      return;
    }

    const deletedUser = users.splice(userIndex, 1)[0]; // Remove o usuário do array
    res.json(deletedUser); // Retorna o usuário deletado
  } catch (error) {
    next(error);
  }
};
