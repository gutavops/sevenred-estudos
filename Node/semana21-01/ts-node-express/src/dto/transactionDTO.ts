import { Decimal } from "@prisma/client/runtime/library"

export interface CreateTransactionDTO {
    description:  string
    price: number
    category: string
    type: "D" | "C"
    userId: string
}

interface TransactionSummary {
    total: number
    credit: number
    debit: number
}

export interface TransactionsResponse {
    summary: TransactionSummary;
    transactions: {
        id: string
        price: Decimal
        description: string
        category: string
        type: string
        userId: string
        createdAt: Date
    }[]; 
}