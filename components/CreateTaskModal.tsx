'use client';

import { useState } from 'react';
import { TaskStatus, TaskPriority } from '@/types';
import { useTaskStore } from '@/store/useTaskStore';
import Modal from './Modal';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStatus?: TaskStatus;
}

export default function CreateTaskModal({ isOpen, onClose, initialStatus }: CreateTaskModalProps) {
  const { addTask, users } = useTaskStore();
  const [title, setTitle] = useState('');
  const [assigneeId, setAssigneeId] = useState(users[0]?.id || '');
  const [status, setStatus] = useState(initialStatus || TaskStatus.TODO);
  const [priority, setPriority] = useState(TaskPriority.MEDIUM);
  const [dueDate, setDueDate] = useState('');

  const handleCreate = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    addTask({
      title,
      description: '',
      assigneeId,
      status,
      priority,
      tagIds: [],
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });

    // Reset form
    setTitle('');
    setAssigneeId(users[0]?.id || '');
    setStatus(initialStatus || TaskStatus.TODO);
    setPriority(TaskPriority.MEDIUM);
    setDueDate('');

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task" size="md">
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        </div>

        {/* Assignee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Assignee
          </label>
          <select
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.values(TaskStatus).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.values(TaskPriority).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Create Task
          </button>
        </div>
      </div>
    </Modal>
  );
}
