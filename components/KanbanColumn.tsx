'use client';

import { TaskStatus, Task } from '@/types';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAddTask: (status: TaskStatus) => void;
}

const statusColors: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'bg-gray-500',
  [TaskStatus.IN_PROGRESS]: 'bg-blue-500',
  [TaskStatus.IN_REVIEW]: 'bg-yellow-500',
  [TaskStatus.DONE]: 'bg-green-500',
};

export default function KanbanColumn({ status, tasks, onTaskClick, onAddTask }: KanbanColumnProps) {
  return (
    <div className="flex-shrink-0 w-80">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {status}
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {tasks.length}
              </span>
            </h2>
          </div>
          <button
            onClick={() => onAddTask(status)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            aria-label="Add task"
          >
            <Plus className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Tasks */}
        <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
              No tasks
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
