import './App.css'
import logo from './assets/logo.svg'
import {PlusCircleIcon, TrashIcon, CheckIcon} from '@phosphor-icons/react'
import clipboard from './assets/ClipBoard.png'
import { useState, useEffect } from 'react'

interface Task {
  id: number;
  description: string;
  checked: boolean;
}
function App() {
  const [taskList, setTaskList] = useState<Task[]>([])

  const [description, setDescription] = useState('')

  const completedTasks = taskList.filter(task => task.checked).length

  async function createTask(e: React.FormEvent) {
    e.preventDefault(); // impede o reload da página
    if(description.trim() === ""){
      alert("Não pode criar uma tarefa vazia")
      return
    }
    try {
      const response = await fetch("http://localhost:8000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          description: description
        })
      })
      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      setDescription("")
      await getTask()
    } catch(error){
      console.error("Erro ao criar tarefa:", error);
    }
  }

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
  
  async function deleteTask(id: number) {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
        method: "DELETE"
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
        <form onSubmit={createTask}>
          <input 
          type="text" 
          placeholder="Adicione uma nova tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={description.trim() !== "" ? "filled" : ""}
          />
          <button type='submit'> 
            Criar<PlusCircleIcon size={16} />
          </button>
        </form>
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
                <button className='delete' onClick={() => deleteTask(task.id)}>
                  <TrashIcon size={16}/>
                </button>
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