import type { Task } from '../../types/task';
import { Trash2 } from 'lucide-react';
import { CustomCheckbox } from '../ui/CustomCheckbox';

interface TaskRowProps {
    task: Task;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

export function TaskRow({ task, onToggleStatus, onDelete }: TaskRowProps) {
    const isCompleted = task.status === "concluída";

    return (
        <tr className="border-b border-gray-300 hover:bg-gray-50 transition-colors">
            <td className="py-4 px-4 text-gray-700">{task.titulo}</td>
            <td className="py-4 px-4 text-gray-600">{task.descricao}</td>
            <td className="py-4 px-4">
                <span
                    className={`inline-block px-4 py-1 rounded-full text-sm font-default -ml-5 
                        ${task.status === 'concluída'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                >
                    {task.status}
                </span>
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Deletar tarefa"
                    >
                        <Trash2 size={20} className="text-red-500 hover:text-red-700" />
                    </button>

                    <CustomCheckbox
                        checked={isCompleted}
                        onChange={() => onToggleStatus(task.id)}
                    />
                </div>
            </td>
        </tr>
    );
}