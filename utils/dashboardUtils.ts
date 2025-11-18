import { Task, TaskStatus, User, KPIMetrics } from '@/types';
import { isOverdue } from './dateUtils';

export const calculateKPIs = (tasks: Task[]): KPIMetrics => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === TaskStatus.DONE).length;
  const inProgressTasks = tasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length;

  const tasksWithDueDate = tasks.filter((t) => t.dueDate);
  const completedTasksWithDueDate = tasksWithDueDate.filter((t) => t.status === TaskStatus.DONE);

  const onTimeCompletedTasks = completedTasksWithDueDate.filter((t) => {
    if (!t.completedAt || !t.dueDate) return false;
    return new Date(t.completedAt) <= new Date(t.dueDate);
  }).length;

  const overdueTasks = tasks.filter(
    (t) => t.status !== TaskStatus.DONE && isOverdue(t.dueDate)
  ).length;

  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const onTimeCompletion =
    completedTasksWithDueDate.length > 0
      ? (onTimeCompletedTasks / completedTasksWithDueDate.length) * 100
      : 0;

  return {
    completionRate,
    onTimeCompletion,
    overdueTasks,
    totalTasks,
    completedTasks,
    inProgressTasks,
  };
};

export const getTasksByUser = (tasks: Task[], users: User[]) => {
  return users.map((user) => {
    const userTasks = tasks.filter((t) => t.assigneeId === user.id);
    const completed = userTasks.filter((t) => t.status === TaskStatus.DONE).length;
    const inProgress = userTasks.filter((t) => t.status === TaskStatus.IN_PROGRESS).length;
    const todo = userTasks.filter((t) => t.status === TaskStatus.TODO).length;

    return {
      user,
      total: userTasks.length,
      completed,
      inProgress,
      todo,
    };
  });
};

export const getTasksByTag = (tasks: Task[], tags: Array<{ id: string; name: string; color: string }>) => {
  return tags.map((tag) => {
    const count = tasks.filter((t) => t.tagIds.includes(tag.id)).length;
    return {
      tag,
      count,
    };
  }).filter((item) => item.count > 0);
};
