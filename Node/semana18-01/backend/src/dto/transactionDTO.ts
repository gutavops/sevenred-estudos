import { Decimal } from "@prisma/client/runtime/library"

export interface CreateTransactionDTO {
    price: number
    description: string
    category: string
    type: 'c'|'d'
}

  interface TransactionSummary {
    total: number
    credit: number
    debit: number
}

export interface TransactionsResponse {
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