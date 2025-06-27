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

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleGetTransactions = async () => {
    try {
    const response = await axios.get<{ transactions: Transaction[]}>('http://localhost:3101/api/finance')
    setTransactions(response.data.transactions)
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
    }
  }

  useEffect(() => {
    handleGetTransactions()
  }, [])

  
  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

 

  return (
    <div className='app'>
      <Header onTransactionCreated={handleGetTransactions}/> 
      <main className="main-container">
        <Summary/>
        <TransactionSearch onSearch={handleSearchTermChange}/>
        <TransactionsTable transactions={transactions} searchTerm={searchTerm} onDeleteSuccess={handleGetTransactions}/>
      </main>
    </div>
  )
}

export default App
