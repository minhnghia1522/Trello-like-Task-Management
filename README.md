# TaskFlow - Professional Task Management System

A sophisticated Trello-like task management web application built with Next.js 19, TypeScript, and modern web technologies. Features a beautiful dark mode interface, drag-and-drop functionality, comprehensive dashboard analytics, and a fully responsive design.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

### Task Board
- **Kanban View**: Visual board with draggable task cards across four status columns (Todo, In Progress, In Review, Done)
- **List View**: Alternative list-based view with collapsible sections grouped by status
- **Advanced Filtering**: Multi-select filters for assignees, tags, and priorities
- **Quick Task Creation**: Inline task creation from any status column
- **Rich Task Details**: Full-featured task editor with rich text descriptions

### Professional Dashboard
- **KPI Metrics**:
  - Task completion rate
  - On-time completion percentage
  - Overdue task count
  - In-progress task tracking

- **Data Visualizations**:
  - Stacked bar chart showing tasks by status and priority
  - Pie chart for tag distribution
  - Progress bars for team workload

- **Team Performance**:
  - Team leaderboard sorted by completed tasks
  - Workload distribution across team members

- **Timeline Features**:
  - Upcoming deadlines with visual indicators
  - Real-time activity feed
  - Overdue task alerts

### Task Management
- **Comprehensive Task Properties**:
  - Title and rich text description
  - Assignee with avatar display
  - Status tracking (Todo, In Progress, In Review, Done)
  - Priority levels (Low, Medium, High)
  - Multiple tag support with custom colors
  - Due date tracking with overdue indicators
  - Creation and completion timestamps

- **Task Editor**:
  - Rich text editor (React Quill) for detailed descriptions
  - Assignee picker with user avatars
  - Status and priority dropdowns
  - Multi-tag selector with color-coded tags
  - Date picker for due dates
  - Task deletion capability

### UI/UX Features
- **Dark Mode**: System-wide dark theme (default) with toggle support
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Fluid transitions and hover effects
- **Accessibility**: Keyboard navigation and ARIA labels
- **Modern Design**: Clean interface with Tailwind CSS styling

### Technical Features
- **State Management**: Zustand for efficient global state
- **Type Safety**: Full TypeScript implementation
- **Mock Data**: 120+ diverse pre-generated tasks for testing
- **Local Storage**: Dark mode preference persistence
- **Activity Logging**: Automatic tracking of task changes

## Tech Stack

- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.18
- **State Management**: Zustand 5.0.8
- **Drag & Drop**: React DnD 16.0.1
- **Charts**: Recharts 2.15.4
- **Rich Text Editor**: React Quill 2.0.0
- **Date Utilities**: date-fns 4.1.0
- **Icons**: Lucide React 0.462.0
- **Package Manager**: pnpm

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── board/             # Task board page (Kanban/List view)
│   ├── dashboard/         # Analytics dashboard page
│   ├── layout.tsx         # Root layout with dark mode
│   ├── page.tsx          # Home page (redirects to board)
│   └── globals.css       # Global styles and dark mode CSS
├── components/            # Reusable React components
│   ├── CreateTaskModal.tsx
│   ├── KanbanColumn.tsx
│   ├── KPICard.tsx
│   ├── ListView.tsx
│   ├── Modal.tsx
│   ├── Navigation.tsx
│   ├── TaskCard.tsx
│   ├── TaskDetailModal.tsx
│   └── TaskFilters.tsx
├── data/                  # Mock data generation
│   └── mockData.ts       # 120+ diverse tasks, users, tags
├── hooks/                 # Custom React hooks
│   ├── useDarkMode.ts
│   └── useFilteredTasks.ts
├── store/                 # Zustand state management
│   └── useTaskStore.ts
├── types/                 # TypeScript type definitions
│   └── index.ts
├── utils/                 # Utility functions
│   ├── dashboardUtils.ts  # KPI calculations
│   ├── dateUtils.ts      # Date formatting
│   └── taskUtils.ts      # Task filtering and grouping
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Trello-like-Task-Management
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

### Development Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Usage Guide

### Task Board

1. **View Tasks**:
   - Switch between Kanban and List views using the toggle buttons
   - Tasks are organized by status columns

2. **Create Tasks**:
   - Click the "+" button in any status column
   - Fill in task details and click "Create Task"

3. **Edit Tasks**:
   - Click on any task card to open the detail modal
   - Modify any field and click "Save Changes"

4. **Filter Tasks**:
   - Click the "Filters" button
   - Select assignees, tags, or priorities
   - Click "Clear All" to reset filters

### Dashboard

- View key performance indicators at the top
- Analyze task distribution with interactive charts
- Check team performance in the leaderboard
- Monitor upcoming deadlines and recent activity

### Dark Mode

- Toggle dark mode using the sun/moon icon in the navigation
- Preference is saved to localStorage

## Data Model

### User
```typescript
{
  id: string
  name: string
  email: string
  avatarUrl: string
}
```

### Task
```typescript
{
  id: string
  title: string
  description: string (rich text)
  assigneeId: string
  status: 'Todo' | 'In Progress' | 'In Review' | 'Done'
  priority: 'Low' | 'Medium' | 'High'
  tagIds: string[]
  dueDate: string | null
  createdAt: string
  completedAt: string | null
}
```

### Tag
```typescript
{
  id: string
  name: string
  color: string (hex)
}
```

## Mock Data

The application includes 120+ pre-generated tasks with:
- 8 team members with unique avatars
- 12 color-coded tags (Frontend, Backend, Bug, Feature, etc.)
- Balanced distribution across statuses and priorities
- Realistic due dates (past, present, and future)
- Varied task complexity and descriptions

## Features in Detail

### Kanban Board
- Four columns representing task workflow stages
- Task cards display key information (assignee, priority, tags, due date)
- Visual priority indicators (colored bars)
- Overdue and due-soon indicators
- Task count per column

### Task Filtering
- Multi-select assignee filter
- Tag-based filtering with color preview
- Priority level filtering
- Active filter count badge
- One-click filter clearing

### Dashboard Analytics
- Real-time KPI calculations
- Interactive Recharts visualizations
- Responsive chart layouts
- Team performance metrics
- Activity timeline

### Responsive Design
- Mobile-first approach
- Adaptive navigation (bottom nav on mobile)
- Collapsible sections on small screens
- Touch-friendly interface
- Optimized chart sizes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Static page generation for optimal load times
- Memoized calculations for dashboard metrics
- Efficient re-renders with Zustand
- Lazy-loaded rich text editor
- Optimized bundle size

## Future Enhancements

Potential features for future versions:
- Actual drag-and-drop task movement between columns
- Backend API integration
- User authentication
- Real-time collaboration (WebSockets)
- Task comments and attachments
- Advanced search functionality
- Export to CSV/PDF
- Email notifications
- Custom tag creation
- Sprint planning features
- Time tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Open source community for the excellent libraries

## Support

For issues, questions, or suggestions, please open an issue in the repository.

---

Built with ❤️ using Next.js 19 and TypeScript
