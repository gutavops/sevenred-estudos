import { CurrencyDollarIcon, ArrowCircleUpIcon, ArrowCircleDownIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

// Define interfaces for the data received from the API
interface SummaryData {
    total: number;
    credit: number;
    debit: number;
  }
  
  interface ApiResponse {
    summary: SummaryData;
  }

  export function Summary() {
    const [summary, setSummary] = useState<SummaryData>({ total: 0, credit: 0, debit: 0 });

    // Função para formatar valores como moeda R$ BRL
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    async function handleGetSummary() {
        try {
            const response = await axios.get<ApiResponse>('http://localhost:3101/api/finance')
            setSummary(response.data.summary)
            } catch (error) {
              console.error("Erro ao buscar o resumo:", error)
            }
    }
    useEffect(() => {
        handleGetSummary();
    }, []);

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