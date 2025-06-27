import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useState } from 'react';

interface TransactionSearchProps {
  onSearch: (searchTerm: string) => void; 
}

export function TransactionSearch({ onSearch }: TransactionSearchProps) {
  // Estado local para armazenar o que o usuário digita no campo de busca
  const [searchTerm, setSearchTerm] = useState('');

  // Função chamada quando o botão "Buscar" é clicado ou Enter é pressionado
  const handleSearch = () => {
    onSearch(searchTerm); 
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="search-section">
      <input
        type="text"
        placeholder="Busque uma transação"
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        onKeyDown={handleKeyPress} 
      />
      <button className="search-button" onClick={handleSearch}> 
        <MagnifyingGlassIcon size={20} /> Buscar
      </button>
    </section>
  );
}