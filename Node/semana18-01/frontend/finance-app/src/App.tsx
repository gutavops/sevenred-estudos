import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { Header } from './components/Header';
import { Summary } from './components/Summary'
import { TransactionSearch } from './components/TransactionSearch'
import { TransactionsTable } from './components/TransactionsTable'


interface Transaction {
  id: string; 
  description: string;
  price: string;
  type: 'c' | 'd';
  category: string;
  createdAt: string;
}

interface SummaryData {
  total: number;
  credit: number;
  debit: number;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [summaryData, setSummaryData] = useState<SummaryData>({ total: 0, credit: 0, debit: 0 });

  const fetchData = async () => {
    try {
    const response = await axios.get<{ transactions: Transaction[], summary: SummaryData }>('http://localhost:3101/api/transaction')
    setTransactions(response.data.transactions)
    setSummaryData(response.data.summary)
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

 

  return (
    <div className='app'>
      <Header onTransactionCreated={fetchData}/> 
      <main className="main-container">
        <Summary summary={summaryData}/>
        <TransactionSearch onSearch={handleSearchTermChange}/>
        <TransactionsTable transactions={transactions} searchTerm={searchTerm} onDeleteSuccess={fetchData}/>
      </main>
    </div>
  )
}

export default App
