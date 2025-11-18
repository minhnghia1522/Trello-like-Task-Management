'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { useTaskStore } from '@/store/useTaskStore';
import Modal from './Modal';
import { Calendar, Tag as TagIcon, User, Flag, Trash2 } from 'lucide-react';
import Image from 'next/image';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface TaskDetailModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskDetailModal({ task, isOpen, onClose }: TaskDetailModalProps) {
  const { updateTask, deleteTask, users, tags } = useTaskStore();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assigneeId, setAssigneeId] = useState(task.assigneeId);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [selectedTags, setSelectedTags] = useState<string[]>(task.tagIds);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
  );

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setAssigneeId(task.assigneeId);
    setStatus(task.status);
    setPriority(task.priority);
    setSelectedTags(task.tagIds);
    setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
  }, [task]);

  const handleSave = () => {
    updateTask(task.id, {
      title,
      description,
      assigneeId,
      status,
      priority,
      tagIds: selectedTags,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
    });
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      onClose();
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Task Details" size="xl">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactQuill
              value={description}
              onChange={setDescription}
              theme="snow"
              className="bg-white dark:bg-gray-800 rounded-lg"
            />
          </div>
        </div>

        {/* Assignee */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <User className="h-4 w-4" />
            <span>Assignee</span>
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
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Flag className="h-4 w-4" />
              <span>Priority</span>
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
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="h-4 w-4" />
              <span>Due Date</span>
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <TagIcon className="h-4 w-4" />
            <span>Tags</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  selectedTags.includes(tag.id)
                    ? 'text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                style={
                  selectedTags.includes(tag.id)
                    ? { backgroundColor: tag.color }
                    : undefined
                }
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={handleDelete}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </button>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
