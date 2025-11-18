'use client';

import { Task } from '@/types';
import { useTaskStore } from '@/store/useTaskStore';
import { formatDate, isOverdue, isDueSoon } from '@/utils/dateUtils';
import { getPriorityColor } from '@/utils/taskUtils';
import { Calendar, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const { users, tags } = useTaskStore();
  const assignee = users.find((u) => u.id === task.assigneeId);
  const taskTags = tags.filter((t) => task.tagIds.includes(t.id));

  const overdue = isOverdue(task.dueDate);
  const dueSoon = isDueSoon(task.dueDate);

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
    >
      {/* Priority Indicator */}
      <div className="flex items-start justify-between mb-2">
        <div className={`w-1 h-8 ${getPriorityColor(task.priority)} rounded-full`} />
        {assignee && (
          <Image
            src={assignee.avatarUrl}
            alt={assignee.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {task.title}
      </h3>

      {/* Tags */}
      {taskTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {taskTags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="text-xs px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </span>
          ))}
          {taskTags.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              +{taskTags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Due Date */}
      {task.dueDate && (
        <div
          className={`flex items-center space-x-1 text-xs ${
            overdue
              ? 'text-red-600 dark:text-red-400'
              : dueSoon
              ? 'text-yellow-600 dark:text-yellow-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {overdue ? <AlertCircle className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
          <span>{formatDate(task.dueDate)}</span>
        </div>
      )}
    </div>
  );
}
