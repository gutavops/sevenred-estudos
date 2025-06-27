import { Decimal } from "@prisma/client/runtime/library";
import prisma from "../db/prisma";
import { CreateTransactionDTO } from "../dto/transactionDTO";
import { ValidationError } from "../errors/ValidationError"

export async function createTransactionService(newTransaction: CreateTransactionDTO) {
    if(!newTransaction.description || !newTransaction.price || !newTransaction.category || !newTransaction.type) {
        throw new ValidationError("Preencha todos os campos obrigatórios.")
    }
    if (newTransaction.type !== 'c' && newTransaction.type !== 'd') {
        throw new ValidationError("O tipo da transação deve ser 'c' para crédito ou 'd' para débito.");
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

interface TransactionSummary {
    total: number
    credit: number
    debit: number
}

interface TransactionsResponse {
    summary: TransactionSummary;
    transactions: {
        id: number
        price: Decimal
        description: string
        category: string
        type: string
        createdAt: Date
    }[]; 
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