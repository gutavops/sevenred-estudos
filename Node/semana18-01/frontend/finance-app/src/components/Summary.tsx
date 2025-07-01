import { CurrencyDollarIcon, ArrowCircleUpIcon, ArrowCircleDownIcon } from '@phosphor-icons/react';
import '../App.css';

interface SummaryData {
    total: number;
    credit: number;
    debit: number;
}
  
interface SummaryProps {
    summary: SummaryData; 
}

export function Summary({ summary }: SummaryProps) {
  // Função para formatar valores como moeda R$ BRL
  const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
      }).format(value);
  };

  return (
      <section className="summary-cards">
        <div className="summary-card income-card">
          <header>
            <span>Entradas</span>
            <ArrowCircleUpIcon size={32} color="var(--green-light)" />
          </header>
          <strong>{formatCurrency(summary.credit)}</strong> 
        </div>

        <div className="summary-card outcome-card">
          <header>
            <span>Saídas</span>
            <ArrowCircleDownIcon size={32} color="var(--red)" />
          </header>
          <strong>{formatCurrency(summary.debit)}</strong> 
        </div>

        <div className="summary-card total-card">
          <header>
            <span>Total</span>
            <CurrencyDollarIcon size={32} color="var(--white)" />
          </header>
          <strong>{formatCurrency(summary.total)}</strong> 
        </div>
      </section>
  )
}