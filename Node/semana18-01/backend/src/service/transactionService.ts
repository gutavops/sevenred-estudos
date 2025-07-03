import prisma from "../db/prisma";
import { CreateTransactionDTO, TransactionsResponse } from "../dto/transactionDTO";
import { ValidationError } from "../errors/ValidationError"

export async function createTransactionService(newTransaction: CreateTransactionDTO) {
    let errors: string[] = []

    validationCreateTransaction(newTransaction, errors)

    if (errors.length > 0) {
        throw new ValidationError(errors.join(' '), 400)
    }
    const transactionCreated = await prisma.transaction.create({
        data: {
            description:   newTransaction.description,
            price: newTransaction.price,
            category:  newTransaction.category,
            type: newTransaction.type,
        }
    })

    return transactionCreated;
}

export async function deleteTransactionService(id: number) {
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

export async function getTransactionsService(): Promise<TransactionsResponse> {
    const transactions = await prisma.transaction.findMany()

    let credit = 0 
    let debit = 0 

    transactions.forEach(transaction => {
        if (transaction.type === 'c') {
            credit += transaction.price.toNumber()
        } else if (transaction.type === 'd') {
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
        { field: dto.category, message: "Categoria é obrigatória." },
        { field: dto.description, message: "Descrição é obrigatório." },
        { field: dto.price, message: "Preço é obrigatório." },
        { field: dto.type, message: "Tipo é obrigatório." }
    ]

    requiredFields.forEach(({ field, message }) => {
        if(field === null || field === undefined || (typeof field === "string" && field.trim() === "")) errors.push(message)
    })

    if(!['c', 'd'].includes(dto.type)) {
        errors.push("O tipo da transação deve ser 'c' para crédito ou 'd' para débito.")
    }
}