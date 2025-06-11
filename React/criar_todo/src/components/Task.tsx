import { CheckIcon } from '@phosphor-icons/react'
import { DeleteButton } from './DeleteButton'

interface TaskProps {
  task: {
    id: number;
    description: string;
    checked: boolean;
  };
  checkTask: (id: number) => Promise<void>;
  getTask: () => Promise<void>;
}

export function Task({ task, checkTask, getTask }: TaskProps) {
  return (
    <li className={`task ${task.checked ? 'done' : ''}`}>
      <button
        onClick={() => checkTask(task.id)}
        className={task.checked ? 'btnComplete' : 'btnIncomplete'}
      >
        <CheckIcon size={16} weight="bold" />
      </button>
      <p>{task.description}</p>
      <DeleteButton id={task.id} getTask={getTask} />
    </li>
  )
}
