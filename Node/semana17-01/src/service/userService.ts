import prisma from "../db/prisma";
import { CreateUserDTO } from "../dto/userDTO";
import { ValidationError } from "../errors/ValidationError"

export async function getUsersService() {
    return await prisma.user.findMany()
}

export async function createUserService(newUser: CreateUserDTO) {
    if(!newUser.cpf || !newUser.email || !newUser.name || !newUser.phone) {
        throw new ValidationError("Preencha todos os campos obrigatórios.")
    }
    const userCreated = await prisma.user.create({
        data: {
            cpf:   newUser.cpf,
            email: newUser.email,
            name:  newUser.name,
            phone: newUser.phone,
            age:   newUser.age
        }
    })

    return userCreated;
}

export async function deleteUserService(id: number) {
    const existingUser = await prisma.user.findUnique({
        where: { id: id },
    });
    if (!existingUser) {
        throw new ValidationError("Usuário não encontrado para exclusão.", 404);
    }
    const userDeleted = await prisma.user.delete({
        where: { id: id },
    });
    return userDeleted;
}

export async function updateUserService(id: number, userData: Partial<CreateUserDTO>) {
    const existingUser = await prisma.user.findUnique({
        where: { id: id },
    });

    if (!existingUser) {
        throw new ValidationError("Usuário não encontrado para atualização.", 404);
    }
    const errors: string[] = [];
    // Valida Email se for fornecido no userData
    if (userData.email !== undefined) {
        if (userData.email === null || userData.email.trim() === '') {
            errors.push("O email não pode ser vazio.");
        } else {
            const emailExistsForOtherUser = await prisma.user.findUnique({
                where: { email: userData.email, NOT: { id: id } }, // Exclui o ID do usuário atual
            });
            if (emailExistsForOtherUser) {
                errors.push("Este email já está em uso por outro usuário.");
            }
        }
    }
    // Valida CPF
    if (userData.cpf !== undefined) {
        if (userData.cpf === null || userData.cpf.trim() === '') {
            errors.push("O CPF não pode ser vazio.");
        } else {
            const cpfExistsForOtherUser = await prisma.user.findUnique({
                where: { cpf: userData.cpf, NOT: { id: id } }, 
            });
            if (cpfExistsForOtherUser) {
                errors.push("Este CPF já está em uso por outro usuário.");
            }
        }
    }
    // Valida Telefone
    if (userData.phone !== undefined) {
        if (userData.phone === null || userData.phone.trim() === '') {
            errors.push("O telefone não pode ser vazio.");
        } else {
            const phoneExistsForOtherUser = await prisma.user.findUnique({
                where: { phone: userData.phone, NOT: { id: id } }, 
            });
            if (phoneExistsForOtherUser) {
                errors.push("Este telefone já está em uso por outro usuário.");
            }
        }
    }
    if (errors.length > 0) {
        throw new ValidationError(errors.join(" "), 400); 
    }

    const userUpdated = await prisma.user.update({
        where: {id: id},
        data: {
            name: userData.name,
            email: userData.email,
            cpf: userData.cpf,
            phone: userData.phone,
            age: userData.age
        }
    })
    return userUpdated
}

export async function getUserByIDService(id: number) {
    const user = await prisma.user.findUnique({
        where: {id: id}
    })
    if (!user) {
        throw new ValidationError('Usuário não encontrado.', 404);
    }

    return user;
}