import { CurrencyDollarIcon } from '@phosphor-icons/react';
import { TransactionModal } from './NewTransactionModal'

interface HeaderProps {
    onTransactionCreated: () => void;
  }

export function Header({ onTransactionCreated }: HeaderProps) {
  return (
    <header>
      <div className="header-content">
        <h1>
          <CurrencyDollarIcon size={32} weight='bold'/>
          <span className="financeText">Finance</span>
        </h1>
        <TransactionModal onTransactionCreated={onTransactionCreated}/>
      </div>
    </header>
  );
}