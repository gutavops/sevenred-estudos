// src/components/AdviceSection.tsx
import { useState } from 'react'
import { ChatCenteredTextIcon } from '@phosphor-icons/react'
import { AdviceCard } from '../AdviceCard'

export function AdviceSection() {
  const [advices, setAdvices] = useState<string[]>([]) 
  const [loading, setLoading] = useState<boolean>(false)

  async function handleGetAdvice() {
    setLoading(true)
    try {
      const response = await fetch('https://api.adviceslip.com/advice')
      const data = await response.json()
      setAdvices(prevAdvices => [...prevAdvices, data.slip.advice])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button onClick={handleGetAdvice} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Advice'} 
        <ChatCenteredTextIcon size={24} />
      </button>

      <div className="advicesList">
        {advices.length === 0 ? (
          <h3>Click the button above to generate a new board!</h3>
        ) : (
          advices.map((advice, index) => (
            <AdviceCard key={index} advice={advice} />
          ))
        )}
      </div>
    </>
  );
}
