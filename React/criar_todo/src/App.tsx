import './App.css'
import logo from './assets/logo.svg'
import { useState, useEffect } from 'react'
import { CreateTask } from './components/CreateTask'
import { TaskList } from './components/TaskList'
import { TaskStatus } from './components/TaskStatus'

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
        <CreateTask getTask={getTask} />
        </div>
        <TaskStatus totalTasks={taskList.length} completedTasks={completedTasks} />
        <TaskList taskList={taskList} checkTask={checkTask} getTask={getTask} />
      </div>
    </>
  )
}

export default App