import './styles.css'

interface AdviceCardProps {
    advice: string;
  }
  
  export function AdviceCard({ advice }: AdviceCardProps) {
    return (
      <div className="adviceCard">
        <h3>{advice}</h3>
      </div>
    );
  }
  