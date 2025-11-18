import { create } from 'zustand';
import { Task, User, Tag, TaskStatus, TaskPriority, FilterOptions, ViewMode, ActivityLog } from '@/types';
import { tasks as initialTasks, users as initialUsers, tags as initialTags, activityLogs as initialActivityLogs } from '@/data/mockData';

interface TaskStore {
  tasks: Task[];
  users: User[];
  tags: Tag[];
  activityLogs: ActivityLog[];
  filters: FilterOptions;
  viewMode: ViewMode;
  darkMode: boolean;
  selectedTask: Task | null;

  // Actions
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  clearFilters: () => void;
  setViewMode: (mode: ViewMode) => void;
  toggleDarkMode: () => void;
  setSelectedTask: (task: Task | null) => void;
  addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: initialTasks,
  users: initialUsers,
  tags: initialTags,
  activityLogs: initialActivityLogs,
  filters: {
    assignees: [],
    tags: [],
    priorities: [],
  },
  viewMode: 'kanban',
  darkMode: true,
  selectedTask: null,

  setTasks: (tasks) => set({ tasks }),

  addTask: (taskData) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      completedAt: taskData.status === TaskStatus.DONE ? new Date().toISOString() : null,
    };

    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));

    // Add activity log
    get().addActivityLog({
      taskId: newTask.id,
      userId: taskData.assigneeId,
      action: 'created task',
      details: `Task "${newTask.title}" was created`,
    });
  },

  updateTask: (taskId, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
              completedAt:
                updates.status === TaskStatus.DONE && task.status !== TaskStatus.DONE
                  ? new Date().toISOString()
                  : updates.status !== TaskStatus.DONE
                  ? null
                  : task.completedAt,
            }
          : task
      ),
    }));

    // Update selected task if it's the one being updated
    const selectedTask = get().selectedTask;
    if (selectedTask && selectedTask.id === taskId) {
      const updatedTask = get().tasks.find(t => t.id === taskId);
      if (updatedTask) {
        set({ selectedTask: updatedTask });
      }
    }

    // Add activity log
    const task = get().tasks.find(t => t.id === taskId);
    if (task) {
      get().addActivityLog({
        taskId,
        userId: task.assigneeId,
        action: 'updated task',
        details: `Task "${task.title}" was updated`,
      });
    }
  },

  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));

    if (get().selectedTask?.id === taskId) {
      set({ selectedTask: null });
    }
  },

  moveTask: (taskId, newStatus) => {
    get().updateTask(taskId, { status: newStatus });

    const task = get().tasks.find(t => t.id === taskId);
    if (task) {
      get().addActivityLog({
        taskId,
        userId: task.assigneeId,
        action: 'changed status',
        details: `Task "${task.title}" moved to ${newStatus}`,
      });
    }
  },

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  clearFilters: () =>
    set({
      filters: {
        assignees: [],
        tags: [],
        priorities: [],
      },
    }),

  setViewMode: (mode) => set({ viewMode: mode }),

  toggleDarkMode: () => {
    const newDarkMode = !get().darkMode;
    set({ darkMode: newDarkMode });

    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },

  setSelectedTask: (task) => set({ selectedTask: task }),

  addActivityLog: (logData) => {
    const newLog: ActivityLog = {
      ...logData,
      id: `activity-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };

    set((state) => ({
      activityLogs: [newLog, ...state.activityLogs].slice(0, 100), // Keep last 100 logs
    }));
  },
}));
