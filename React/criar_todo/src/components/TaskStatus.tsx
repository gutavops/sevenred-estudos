interface TaskStatusProps {
    totalTasks: number;
    completedTasks: number;
  }
  
  export function TaskStatus({ totalTasks, completedTasks }: TaskStatusProps) {
    return (
      <div className='taskStatus'>
        <p className='created'>
          Tarefas criadas <span>{totalTasks}</span>
        </p>
        <p className='completed'>
          Concluídas <span>{completedTasks} de {totalTasks}</span>
        </p>
      </div>
    )
  }
  