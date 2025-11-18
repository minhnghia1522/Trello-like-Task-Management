'use client';

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTaskStore } from '@/store/useTaskStore';
import { useFilteredTasks } from '@/hooks/useFilteredTasks';
import { TaskStatus, Task } from '@/types';
import { groupTasksByStatus } from '@/utils/taskUtils';
import Navigation from '@/components/Navigation';
import KanbanColumn from '@/components/KanbanColumn';
import TaskFilters from '@/components/TaskFilters';
import ListView from '@/components/ListView';
import TaskDetailModal from '@/components/TaskDetailModal';
import CreateTaskModal from '@/components/CreateTaskModal';
import { LayoutGrid, List } from 'lucide-react';

export default function BoardPage() {
  const { viewMode, setViewMode, selectedTask, setSelectedTask } = useTaskStore();
  const filteredTasks = useFilteredTasks();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createTaskStatus, setCreateTaskStatus] = useState<TaskStatus>(TaskStatus.TODO);

  const groupedTasks = groupTasksByStatus(filteredTasks);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleAddTask = (status: TaskStatus) => {
    setCreateTaskStatus(status);
    setIsCreateModalOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Board</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Showing {filteredTasks.length} tasks
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <TaskFilters />

              {/* View Toggle */}
              <div className="flex items-center bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'kanban'
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:inline">Kanban</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:inline">List</span>
                </button>
              </div>
            </div>
          </div>

          {/* Board Content */}
          {viewMode === 'kanban' ? (
            <div className="flex space-x-6 overflow-x-auto pb-4">
              {Object.values(TaskStatus).map((status) => (
                <KanbanColumn
                  key={status}
                  status={status}
                  tasks={groupedTasks[status]}
                  onTaskClick={handleTaskClick}
                  onAddTask={handleAddTask}
                />
              ))}
            </div>
          ) : (
            <ListView tasks={filteredTasks} onTaskClick={handleTaskClick} />
          )}
        </div>

        {/* Modals */}
        {selectedTask && (
          <TaskDetailModal
            task={selectedTask}
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}

        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          initialStatus={createTaskStatus}
        />
      </div>
    </DndProvider>
  );
}
