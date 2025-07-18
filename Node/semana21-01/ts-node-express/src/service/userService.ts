import prisma from "../db/prisma";
import { CreateUserDTO } from "../dto/userDTO";
import { ValidationError } from "../errors/ValidationError"

export async function getUsersService() {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            phone: true,
            age: true,
        }
    })
}

export async function createUserService(newUser: CreateUserDTO) {
    await validateUser(newUser);
    const userCreated = await prisma.user.create({
        data: {
            cpf: newUser.cpf,
            email: newUser.email,
            name: newUser.name,
            phone: newUser.phone,
            age: newUser.age,
        }
    })

    return userCreated;
}

export async function deleteUserService(id: string) {
    await getUserByIDService(id)

    const userDeleted = await prisma.user.delete({
        where: { id: id },
    });
    return userDeleted;
}

export async function updateUserService(id: string, userData: Partial<CreateUserDTO>) {
    await getUserByIDService(id)

    await validateUser(userData, id)

    const userUpdated = await prisma.user.update({
        where: { id: id },
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

export async function getUserByIDService(id: string) {
    if (!id) throw new ValidationError('Usuário é obrigatório.', 400);

    const user = await prisma.user.findUnique({
        where: { id: id }
    })

    if (!user) {
        throw new ValidationError('Usuário não encontrado.', 404);
    }

    return user;
}

async function validateUser(userData: Partial<CreateUserDTO>, id?: string) {
    const errors: string[] = [];

    // Validação para campos obrigatórios não serem nulos, indefinidos ou strings vazias
    if (!userData.name || userData.name.trim() === '') {
        errors.push("Nome é obrigatório.");
    }
    if (!userData.email || userData.email.trim() === '') {
        errors.push("Email é obrigatório.");
    }
    if (!userData.cpf || userData.cpf.trim() === '') {
        errors.push("CPF é obrigatório.");
    }
    if (!userData.phone || userData.phone.trim() === '') {
        errors.push("Telefone é obrigatório.");
    }

    const usersExists = await prisma.user.findMany({
        where: {
            OR: [
                {
                    email: userData.email,
                },
                {
                    cpf: userData.cpf
                },
                {
                    phone: userData.phone
                }
            ],
            ...(id ? { NOT: { id: id } } : {}),
        },
    });


    if (userData.email) {
        const emailIndex = usersExists.findIndex(user => user.email === userData.email)

        if (emailIndex != -1) {
            errors.push("Este email já está em uso por outro usuário.");
        }
    }

    if (userData.cpf) {
        const cpfIndex = usersExists.findIndex(user => user.cpf === userData.cpf)

        if (cpfIndex != -1) {
            errors.push("Este CPF já está em uso por outro usuário.");
        }
    }

    if (userData.phone) {
        const phoneIndex = usersExists.findIndex(user => user.phone === userData.phone)

        if (phoneIndex != -1) {
            errors.push("Este telefone já está em uso por outro usuário.");
        }
    }

    if (errors.length > 0) {
        throw new ValidationError(errors.join(" "), 400);
    }
}

