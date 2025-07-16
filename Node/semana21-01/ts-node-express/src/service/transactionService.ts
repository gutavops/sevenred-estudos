import prisma from "../db/prisma";
import { CreateTransactionDTO, TransactionsResponse } from "../dto/transactionDTO";
import { ValidationError } from "../errors/ValidationError"
import { getUserByIDService } from "./userService";

export async function createTransactionService(newTransaction: CreateTransactionDTO) {
    let errors: string[] = [];

    validationCreateTransaction(newTransaction, errors)

    if (errors.length > 0) {
        throw new ValidationError(errors.join(' '), 400);
    }

    await getUserByIDService(newTransaction.userId)


    const transactionCreated = await prisma.transaction.create({
        data: {
            description: newTransaction.description,
            price: newTransaction.price,
            category: newTransaction.category,
            type: newTransaction.type,
            userId: newTransaction.userId
        }
    })

    return transactionCreated;
}

export async function deleteTransactionService(id: string) {
    const transaction = await prisma.transaction.findUnique({
        where: { id: id },
    });

    if (!transaction) {
        throw new ValidationError("Transação não encontrado para exclusão.", 404);
    }

    const transactionDeleted = await prisma.transaction.delete({
        where: { id: id },
    });

    return transactionDeleted;
}

export async function getTransactionsByUserService(userId: string): Promise<TransactionsResponse> {
    await getUserByIDService(userId)


    const transactions = await prisma.transaction.findMany({
        where: { userId: userId }
    })

    let credit = 0
    let debit = 0

    transactions.forEach(transaction => {
        if (transaction.type === 'C') {
            credit += transaction.price.toNumber()
        } else if (transaction.type === 'D') {
            debit += transaction.price.toNumber()
        }
    })

    const total = credit - debit

    return {
        summary: {
            total,
            credit,
            debit
        },
        transactions
    }
}

function validationCreateTransaction(dto: CreateTransactionDTO, errors: string[]) {
    const requiredFields = [
        { field: dto.category, message: "Categoria é obrigatório." },
        { field: dto.description, message: "Descrição é obrigatória." },
        { field: dto.price, message: "Preço é obrigatório." },
        { field: dto.type, message: "Tipo é obrigatório." },
        { field: dto.userId, message: "Usuário é obrigatório." },
    ]

    requiredFields.forEach(({ field, message }) => {
        if (field === null || field === undefined) errors.push(message)
    })

    if (!["C", "D"].includes(dto.type)) {
        errors.push("Tipo precisa ser 'D' ou 'C'.")
    }
}

