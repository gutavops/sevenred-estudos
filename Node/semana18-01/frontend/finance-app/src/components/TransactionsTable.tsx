import { TrashIcon } from '@phosphor-icons/react';
import axios from 'axios';

interface Transaction {
  id: string; 
  description: string;
  price: string;
  type: 'c' | 'd';
  category: string;
  createdAt: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  searchTerm: string; 
  onDeleteSuccess: () => void;
}

export function TransactionsTable({ transactions, searchTerm, onDeleteSuccess }: TransactionsTableProps) {
  const formatCurrency = (value: string) => {
    const numericValue = parseFloat(value); 
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',   
      month: '2-digit', 
      year: 'numeric'   
    }).format(date);
  };

  const filteredTransactions = searchTerm
    ? transactions.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : transactions;

    const handleDeleteTransaction = async (id: string) => {
        try {
          await axios.delete(`http://localhost:3101/api/transaction/${id}`);
          onDeleteSuccess(); // Atualiza a lista depois de deletar
        } catch (error) {
          console.error("Erro ao deletar transação:", error);
        }
      };

  return (
    <section className="transactions-table-section">
      <table>
        <tbody>
          {filteredTransactions.length > 0 && (
            filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td className={transaction.type === 'c' ? 'credit' : 'debit'}> 
                  {transaction.type === 'd' && '- '} 
                  {formatCurrency(transaction.price)}
                </td>
                <td>{transaction.category}</td>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>
                    <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="delete-button"
                        title="Deletar transação"
                    >
                        <TrashIcon size={24} color="var(--red)" />
                    </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}