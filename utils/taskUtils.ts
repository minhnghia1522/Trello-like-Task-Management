import { Task, TaskStatus, FilterOptions } from '@/types';

export const filterTasks = (tasks: Task[], filters: FilterOptions): Task[] => {
  return tasks.filter((task) => {
    if (filters.assignees.length > 0 && !filters.assignees.includes(task.assigneeId)) {
      return false;
    }

    if (filters.tags.length > 0) {
      const hasMatchingTag = task.tagIds.some((tagId) => filters.tags.includes(tagId));
      if (!hasMatchingTag) return false;
    }

    if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) {
      return false;
    }

    return true;
  });
};

export const groupTasksByStatus = (tasks: Task[]): Record<TaskStatus, Task[]> => {
  return {
    [TaskStatus.TODO]: tasks.filter((t) => t.status === TaskStatus.TODO),
    [TaskStatus.IN_PROGRESS]: tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS),
    [TaskStatus.IN_REVIEW]: tasks.filter((t) => t.status === TaskStatus.IN_REVIEW),
    [TaskStatus.DONE]: tasks.filter((t) => t.status === TaskStatus.DONE),
  };
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'High':
      return 'bg-red-500';
    case 'Medium':
      return 'bg-yellow-500';
    case 'Low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const getPriorityTextColor = (priority: string): string => {
  switch (priority) {
    case 'High':
      return 'text-red-500';
    case 'Medium':
      return 'text-yellow-500';
    case 'Low':
      return 'text-green-500';
    default:
      return 'text-gray-500';
  }
};
