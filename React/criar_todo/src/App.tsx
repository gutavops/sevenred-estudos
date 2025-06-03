import './App.css'
import logo from './assets/logo.svg'
import {PlusCircleIcon} from '@phosphor-icons/react'
import clipboard from './assets/ClipBoard.png'

function App() {
  return (
    <>
      <div className='app'>
        <header>
          <img src={logo} alt="todo" />
        </header>
        <div className='newTasks'>
        <form>
          <input type="text" placeholder="Adicione uma nova tarefa"/>
          <button> Criar<PlusCircleIcon size={16} /></button>
        </form>
        </div>
        <div className='taskStatus'>
          <p className='created'>
            Tarefas criadas <span>0</span>
          </p>
          <p className='completed'>
            Concluídas <span>0</span>
          </p>
        </div>
        <div className="taskList">
        {/*<div className="emptyList">
        <img src={clipboard} alt="Clipboard" />
        <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
        <span>Crie tarefas e organize seus itens a fazer</span>
  </div>*/}
</div>
      </div>
    </>
  )
}

export default App