import { Task } from './Task'
import clipboard from '../assets/ClipBoard.png'

interface TaskListProps {
  taskList: {
    id: number;
    description: string;
    checked: boolean;
  }[];
  checkTask: (id: number) => Promise<void>;
  getTask: () => Promise<void>;
}

export function TaskList({ taskList, checkTask, getTask }: TaskListProps) {
  return (
    <div className="taskList">
      <ul className="taskItems">
        {taskList.length === 0 ? (
          <div className="emptyList">
            <img src={clipboard} alt="Clipboard" />
            <p><strong>Você ainda não tem tarefas cadastradas</strong></p>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        ) : (
          taskList.map(task => (
            <Task key={task.id} task={task} checkTask={checkTask} getTask={getTask} />
          ))
        )}
      </ul>
    </div>
  )
}
