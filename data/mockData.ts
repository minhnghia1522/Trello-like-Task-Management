import { User, Tag, Task, TaskStatus, TaskPriority, ActivityLog } from '@/types';

export const users: User[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.j@company.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '2', name: 'Michael Chen', email: 'michael.c@company.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: '3', name: 'Emily Rodriguez', email: 'emily.r@company.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
  { id: '4', name: 'David Kim', email: 'david.k@company.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
  { id: '5', name: 'Jessica Taylor', email: 'jessica.t@company.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica' },
  { id: '6', name: 'Robert Martinez', email: 'robert.m@company.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert' },
  { id: '7', name: 'Amanda Williams', email: 'amanda.w@company.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda' },
  { id: '8', name: 'James Brown', email: 'james.b@company.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
];

export const tags: Tag[] = [
  { id: '1', name: 'Frontend', color: '#3B82F6' },
  { id: '2', name: 'Backend', color: '#10B981' },
  { id: '3', name: 'Bug', color: '#EF4444' },
  { id: '4', name: 'Feature', color: '#8B5CF6' },
  { id: '5', name: 'Design', color: '#F59E0B' },
  { id: '6', name: 'Database', color: '#06B6D4' },
  { id: '7', name: 'API', color: '#EC4899' },
  { id: '8', name: 'Testing', color: '#14B8A6' },
  { id: '9', name: 'Documentation', color: '#6366F1' },
  { id: '10', name: 'Performance', color: '#F97316' },
  { id: '11', name: 'Security', color: '#DC2626' },
  { id: '12', name: 'DevOps', color: '#7C3AED' },
];

const getRandomDate = (daysOffset: number, variance: number = 5) => {
  const today = new Date();
  const offset = daysOffset + Math.floor(Math.random() * variance) - variance / 2;
  const date = new Date(today);
  date.setDate(today.getDate() + offset);
  return date.toISOString();
};

const taskTemplates = [
  { title: 'Implement user authentication flow', description: 'Create a secure authentication system with JWT tokens and refresh token rotation.', tags: ['2', '11'], priority: TaskPriority.HIGH },
  { title: 'Design dashboard mockups', description: 'Create comprehensive mockups for the analytics dashboard with user feedback.', tags: ['5'], priority: TaskPriority.MEDIUM },
  { title: 'Fix navigation bar responsive issues', description: 'The navigation bar breaks on mobile devices below 768px width.', tags: ['1', '3'], priority: TaskPriority.HIGH },
  { title: 'Optimize database queries', description: 'Improve query performance by adding proper indexes and refactoring N+1 queries.', tags: ['6', '10'], priority: TaskPriority.HIGH },
  { title: 'Write API documentation', description: 'Document all REST API endpoints with request/response examples.', tags: ['9', '7'], priority: TaskPriority.MEDIUM },
  { title: 'Implement real-time notifications', description: 'Add WebSocket support for real-time push notifications to users.', tags: ['2', '4'], priority: TaskPriority.MEDIUM },
  { title: 'Create unit tests for auth module', description: 'Write comprehensive unit tests to cover all authentication scenarios.', tags: ['8'], priority: TaskPriority.HIGH },
  { title: 'Update landing page design', description: 'Refresh the landing page with new branding and improved call-to-actions.', tags: ['1', '5'], priority: TaskPriority.LOW },
  { title: 'Set up CI/CD pipeline', description: 'Configure automated testing and deployment using GitHub Actions.', tags: ['12'], priority: TaskPriority.HIGH },
  { title: 'Implement file upload feature', description: 'Allow users to upload and manage files with drag-and-drop support.', tags: ['1', '4'], priority: TaskPriority.MEDIUM },
  { title: 'Fix memory leak in data grid', description: 'Data grid component causes memory leak when rendering large datasets.', tags: ['1', '3', '10'], priority: TaskPriority.HIGH },
  { title: 'Add dark mode support', description: 'Implement system-wide dark mode with user preference persistence.', tags: ['1', '4'], priority: TaskPriority.MEDIUM },
  { title: 'Create email notification templates', description: 'Design and implement email templates for various notification types.', tags: ['5', '2'], priority: TaskPriority.LOW },
  { title: 'Implement rate limiting', description: 'Add rate limiting to API endpoints to prevent abuse.', tags: ['2', '11'], priority: TaskPriority.HIGH },
  { title: 'Optimize image loading', description: 'Implement lazy loading and image optimization for better performance.', tags: ['1', '10'], priority: TaskPriority.MEDIUM },
  { title: 'Add data export functionality', description: 'Allow users to export their data in CSV and JSON formats.', tags: ['4', '2'], priority: TaskPriority.LOW },
  { title: 'Fix broken links in documentation', description: 'Several documentation links are broken and need to be updated.', tags: ['9', '3'], priority: TaskPriority.LOW },
  { title: 'Implement search functionality', description: 'Add full-text search with filtering and sorting capabilities.', tags: ['1', '2', '4'], priority: TaskPriority.HIGH },
  { title: 'Create user onboarding flow', description: 'Design an intuitive onboarding experience for new users.', tags: ['1', '5'], priority: TaskPriority.MEDIUM },
  { title: 'Set up error monitoring', description: 'Integrate error tracking and monitoring service (e.g., Sentry).', tags: ['12'], priority: TaskPriority.HIGH },
  { title: 'Implement data caching strategy', description: 'Add Redis caching layer to reduce database load.', tags: ['2', '6', '10'], priority: TaskPriority.MEDIUM },
  { title: 'Create mobile app mockups', description: 'Design mobile application interface for iOS and Android.', tags: ['5'], priority: TaskPriority.LOW },
  { title: 'Add multi-language support', description: 'Implement i18n for English, Spanish, and French languages.', tags: ['1', '4'], priority: TaskPriority.MEDIUM },
  { title: 'Fix calendar date picker bug', description: 'Date picker shows wrong dates in certain timezones.', tags: ['1', '3'], priority: TaskPriority.MEDIUM },
  { title: 'Implement backup system', description: 'Set up automated database backups with restore procedures.', tags: ['12', '6'], priority: TaskPriority.HIGH },
];

export const tasks: Task[] = [];

// Generate 120 tasks based on templates
for (let i = 0; i < 120; i++) {
  const template = taskTemplates[i % taskTemplates.length];
  const statusValues = Object.values(TaskStatus);
  const status = statusValues[Math.floor(Math.random() * statusValues.length)];
  const assigneeId = users[Math.floor(Math.random() * users.length)].id;

  let dueDate: string | null = null;
  let completedAt: string | null = null;

  if (Math.random() > 0.2) { // 80% have due dates
    if (status === TaskStatus.DONE) {
      dueDate = getRandomDate(-15, 10);
      completedAt = getRandomDate(-5, 5);
    } else {
      dueDate = getRandomDate(Math.random() > 0.3 ? 7 : -3, 10);
    }
  } else if (status === TaskStatus.DONE) {
    completedAt = getRandomDate(-5, 5);
  }

  tasks.push({
    id: `task-${i + 1}`,
    title: `${template.title} ${i > 24 ? `#${Math.floor(i / 25)}` : ''}`,
    description: template.description,
    assigneeId,
    status,
    priority: template.priority,
    tagIds: template.tags,
    dueDate,
    createdAt: getRandomDate(-30, 10),
    completedAt,
  });
}

// Generate activity logs
export const activityLogs: ActivityLog[] = [];
const actions = [
  'created task',
  'updated task',
  'changed status',
  'added comment',
  'changed priority',
  'assigned task',
  'completed task',
];

for (let i = 0; i < 50; i++) {
  const task = tasks[Math.floor(Math.random() * tasks.length)];
  const user = users[Math.floor(Math.random() * users.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];

  activityLogs.push({
    id: `activity-${i + 1}`,
    taskId: task.id,
    userId: user.id,
    action,
    timestamp: getRandomDate(-7, 7),
    details: `${user.name} ${action} "${task.title}"`,
  });
}

// Sort activity logs by timestamp (most recent first)
activityLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
