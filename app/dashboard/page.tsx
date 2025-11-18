'use client';

import { useMemo } from 'react';
import { useTaskStore } from '@/store/useTaskStore';
import { calculateKPIs, getTasksByUser, getTasksByTag } from '@/utils/dashboardUtils';
import { formatRelativeTime, isOverdue, isDueSoon } from '@/utils/dateUtils';
import Navigation from '@/components/Navigation';
import KPICard from '@/components/KPICard';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Activity,
} from 'lucide-react';
import { TaskStatus, TaskPriority } from '@/types';
import Image from 'next/image';

export default function DashboardPage() {
  const { tasks, users, tags, activityLogs } = useTaskStore();

  const kpis = useMemo(() => calculateKPIs(tasks), [tasks]);
  const tasksByUser = useMemo(() => getTasksByUser(tasks, users), [tasks, users]);
  const tasksByTag = useMemo(() => getTasksByTag(tasks, tags), [tasks, tags]);

  // Leaderboard sorted by completed tasks
  const leaderboard = useMemo(
    () => [...tasksByUser].sort((a, b) => b.completed - a.completed),
    [tasksByUser]
  );

  // Tasks by status and priority for stacked bar chart
  const tasksByStatusPriority = useMemo(() => {
    return Object.values(TaskStatus).map((status) => {
      const statusTasks = tasks.filter((t) => t.status === status);
      return {
        status,
        High: statusTasks.filter((t) => t.priority === TaskPriority.HIGH).length,
        Medium: statusTasks.filter((t) => t.priority === TaskPriority.MEDIUM).length,
        Low: statusTasks.filter((t) => t.priority === TaskPriority.LOW).length,
      };
    });
  }, [tasks]);

  // Upcoming deadlines
  const upcomingDeadlines = useMemo(() => {
    return tasks
      .filter((t) => t.dueDate && t.status !== TaskStatus.DONE)
      .sort((a, b) => {
        if (!a.dueDate || !b.dueDate) return 0;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      })
      .slice(0, 10);
  }, [tasks]);

  // Recent activity
  const recentActivity = activityLogs.slice(0, 10);

  // Pie chart colors
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Overview of your tasks and team performance
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Task Completion Rate"
            value={`${kpis.completionRate.toFixed(1)}%`}
            subtitle={`${kpis.completedTasks} of ${kpis.totalTasks} tasks`}
            icon={<CheckCircle2 className="h-6 w-6" />}
            color="blue"
          />
          <KPICard
            title="On-Time Completion"
            value={`${kpis.onTimeCompletion.toFixed(1)}%`}
            subtitle="Completed before deadline"
            icon={<Clock className="h-6 w-6" />}
            color="green"
          />
          <KPICard
            title="Overdue Tasks"
            value={kpis.overdueTasks}
            subtitle="Need immediate attention"
            icon={<AlertCircle className="h-6 w-6" />}
            color="red"
          />
          <KPICard
            title="In Progress"
            value={kpis.inProgressTasks}
            subtitle="Currently being worked on"
            icon={<TrendingUp className="h-6 w-6" />}
            color="yellow"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tasks by Status & Priority */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tasks by Status & Priority
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tasksByStatusPriority}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="status" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                  }}
                />
                <Legend />
                <Bar dataKey="High" stackId="a" fill="#EF4444" />
                <Bar dataKey="Medium" stackId="a" fill="#F59E0B" />
                <Bar dataKey="Low" stackId="a" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tag Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tag Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tasksByTag}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ tag, count }) => `${tag.name}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {tasksByTag.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.tag.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F9FAFB',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Leaderboard */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Team Leaderboard
            </h2>
            <div className="space-y-4">
              {leaderboard.slice(0, 5).map((item, index) => (
                <div
                  key={item.user.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-500 dark:text-gray-400 w-6">
                      #{index + 1}
                    </span>
                    <Image
                      src={item.user.avatarUrl}
                      alt={item.user.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.user.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.total} total tasks
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {item.completed}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">completed</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workload Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Workload Distribution
            </h2>
            <div className="space-y-4">
              {tasksByUser.slice(0, 5).map((item) => {
                const maxTasks = Math.max(...tasksByUser.map((u) => u.total));
                const percentage = maxTasks > 0 ? (item.total / maxTasks) * 100 : 0;

                return (
                  <div key={item.user.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={item.user.avatarUrl}
                          alt={item.user.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.user.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.total} tasks
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Upcoming Deadlines
              </h2>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
                  No upcoming deadlines
                </p>
              ) : (
                upcomingDeadlines.map((task) => {
                  const assignee = users.find((u) => u.id === task.assigneeId);
                  const overdue = isOverdue(task.dueDate);
                  const dueSoon = isDueSoon(task.dueDate);

                  return (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        {assignee && (
                          <Image
                            src={assignee.avatarUrl}
                            alt={assignee.name}
                            width={32}
                            height={32}
                            className="rounded-full flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {task.title}
                          </p>
                          <p
                            className={`text-sm ${
                              overdue
                                ? 'text-red-600 dark:text-red-400'
                                : dueSoon
                                ? 'text-yellow-600 dark:text-yellow-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}
                          >
                            {formatRelativeTime(task.dueDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity) => {
                const user = users.find((u) => u.id === activity.userId);
                return (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    {user && (
                      <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.details}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
