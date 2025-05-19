import {Card} from './components/Card'
import './App.css'

function App() {
  return (
    <div>
      <h1>Componentes e Propriedades</h1>
      <div className='cardContainer'>
        <Card text='Olá Mundo'/>
        <Card text='Olá Mundo'/>
        <Card text='Olá Mundo'/>
      </div>
    </div>
  )
}

export default App
