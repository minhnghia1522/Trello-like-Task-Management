export enum TaskStatus {
  TODO = 'Todo',
  IN_PROGRESS = 'In Progress',
  IN_REVIEW = 'In Review',
  DONE = 'Done',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  status: TaskStatus;
  priority: TaskPriority;
  tagIds: string[];
  dueDate: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface FilterOptions {
  assignees: string[];
  tags: string[];
  priorities: TaskPriority[];
}

export type ViewMode = 'kanban' | 'list';

export interface ActivityLog {
  id: string;
  taskId: string;
  userId: string;
  action: string;
  timestamp: string;
  details: string;
}

export interface KPIMetrics {
  completionRate: number;
  onTimeCompletion: number;
  overdueTasks: number;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
}
