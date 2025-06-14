import { TrashIcon } from '@phosphor-icons/react'

interface DeleteButtonProps {
    id: number,
    getTask: () => Promise<void>
}

export function DeleteButton({id, getTask}: DeleteButtonProps) {
    async function deleteTask() {
        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
                method: 'DELETE',
            })
        
              if (!response.ok) {
                throw new Error('Erro ao deletar tarefa')
              }
        
              // Se deletou com sucesso, atualiza a lista
              await getTask()
        } catch (error) {
        console.error('Erro ao deletar tarefa:', error)
        }
    }

    return (
        <button className='delete' onClick={deleteTask}>
            <TrashIcon size={16}/>
        </button>
    )
}

