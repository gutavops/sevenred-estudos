import { useState } from 'react'
import { MoonIcon, SunIcon} from '@phosphor-icons/react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    
      document.body.classList.toggle('dark')
    
  }
  
  return (
    <>
      <header>  
        <h1>Contador: {count}</h1>
        <div className='theme'>
          <button id='toggle' onClick={toggleTheme}>
            {theme == 'dark' ? <MoonIcon size={24}/> : <SunIcon size={24}/>}
          </button>
        </div>
      </header>
      <div className='countButton'>
        <button onClick={() => setCount((count) => count + 1)}>
          Clique
        </button>
      </div>
    </>
  )
}

export default App
