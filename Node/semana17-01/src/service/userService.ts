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
    try {
        const userDeleted = await prisma.user.delete({
            where: {id: id}
        })
        return userDeleted
    } catch (error) {
        throw new ValidationError("Usuário não foi encontrado.", 404)
    }
}

export async function updateUserService(id: number, userData: Partial<CreateUserDTO>) {
    try {
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
    } catch (error) {
        throw new ValidationError("Usuário não foi encontrado.", 404)
    }
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