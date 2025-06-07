import './App.css'
import logo from './assets/logo.svg'
import { CheckIcon } from '@phosphor-icons/react'
import clipboard from './assets/ClipBoard.png'
import { useState, useEffect } from 'react'
import { DeleteButton } from './components/DeleteButton'
import { CreateTask } from './components/CreateTask'

interface Task {
  id: number;
  description: string;
  checked: boolean;
}

function App() {
  const [taskList, setTaskList] = useState<Task[]>([])

  const completedTasks = taskList.filter(task => task.checked).length

  async function getTask() {
    try {
      const response = await fetch("http://localhost:8000/api/tasks")
      const tasks = await response.json()
      setTaskList(tasks)
    } catch(error){
      console.error("Erro ao criar tarefa:", error);
    }
  }

  
  async function checkTask(id: number) {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: "PATCH"
      })
      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }
      
      await getTask()
    } catch(error){
      console.error("Erro ao criar tarefa:", error);
    }
  }
 
  useEffect(() => {
    getTask()
  }, [])
  return (
    <>
      <div className='app'>
        <header>
          <img src={logo} alt="todo" />
        </header>
        <div className='newTasks'>
        <CreateTask onTaskCreated={getTask} />
        </div>
        <div className='taskStatus'>
          <p className='created'>
            Tarefas criadas <span>{taskList.length}</span>
          </p>
          <p className='completed'>
            Concluídas <span>{completedTasks} de {taskList.length}</span>
          </p>
        </div>
        <div className="taskList">
        <ul className="taskItems">
          {taskList.length === 0 ? (
            <div className="emptyList">
            <img src={clipboard} alt="Clipboard" />
            <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
            <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          ) : (
            taskList.map((task) => (
              <li className={`task ${task.checked ? 'done' : ''}`} key={task.id}>
                <button
                  onClick={() => checkTask(task.id)}
                  className={task.checked ? 'btnComplete' : 'btnIncomplete'}
                >
                  <CheckIcon size={16} weight="bold" />
                </button>
                <p>{task.description}</p>
                <DeleteButton id={task.id} onDeleteSuccess={getTask} />
              </li>
            ))
          )}
        </ul>
      </div>
      </div>
    </>
  )
}

export default App