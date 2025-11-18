'use client';

import { Task, TaskStatus } from '@/types';
import { groupTasksByStatus } from '@/utils/taskUtils';
import TaskCard from './TaskCard';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface ListViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function ListView({ tasks, onTaskClick }: ListViewProps) {
  const [expandedSections, setExpandedSections] = useState<Record<TaskStatus, boolean>>({
    [TaskStatus.TODO]: true,
    [TaskStatus.IN_PROGRESS]: true,
    [TaskStatus.IN_REVIEW]: true,
    [TaskStatus.DONE]: true,
  });

  const groupedTasks = groupTasksByStatus(tasks);

  const toggleSection = (status: TaskStatus) => {
    setExpandedSections((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const statusColors: Record<TaskStatus, string> = {
    [TaskStatus.TODO]: 'text-gray-600 dark:text-gray-400',
    [TaskStatus.IN_PROGRESS]: 'text-blue-600 dark:text-blue-400',
    [TaskStatus.IN_REVIEW]: 'text-yellow-600 dark:text-yellow-400',
    [TaskStatus.DONE]: 'text-green-600 dark:text-green-400',
  };

  return (
    <div className="space-y-4">
      {Object.entries(groupedTasks).map(([status, statusTasks]) => (
        <div
          key={status}
          className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {/* Section Header */}
          <button
            onClick={() => toggleSection(status as TaskStatus)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              {expandedSections[status as TaskStatus] ? (
                <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
              <h2
                className={`text-lg font-semibold ${statusColors[status as TaskStatus]}`}
              >
                {status}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({statusTasks.length})
              </span>
            </div>
          </button>

          {/* Tasks */}
          {expandedSections[status as TaskStatus] && (
            <div className="p-4 pt-0 space-y-3">
              {statusTasks.length === 0 ? (
                <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm">
                  No tasks in this status
                </div>
              ) : (
                statusTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)} />
                ))
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
