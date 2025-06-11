import { useState } from 'react'
import { PlusCircleIcon } from '@phosphor-icons/react'

interface CreateTaskProps {
    getTask: () => Promise<void>
  }

export function CreateTask({ getTask }: CreateTaskProps) {
    const [description, setDescription] = useState("")

    async function createTask(e: React.FormEvent) {
        e.preventDefault(); 

        try {
            const response = await fetch("http://localhost:8000/api/tasks", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ description })
              })
        
              if (!response.ok) {
                throw new Error("Erro ao criar tarefa")
              }
        
              setDescription("") 
              await getTask() 
            } catch (error) {
              console.error("Erro ao criar tarefa:", error)
            }
        
    }

    return (
        <form onSubmit={createTask}>
          <input 
          type="text" 
          placeholder="Adicione uma nova tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={description.trim() !== "" ? "filled" : ""}
          />
          <button 
          type='submit' 
          disabled={description.trim() === ""}
          > 
            Criar<PlusCircleIcon size={16} />
          </button>
        </form>
    )
}