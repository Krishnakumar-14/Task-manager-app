
import { Task, Priority, Status } from './types';

// Helper to format dates as 'YYYY-MM-DD'
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const today = new Date();

const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

const twoDaysAgo = new Date();
twoDaysAgo.setDate(today.getDate() - 2);

const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 7);

const lastMonth = new Date();
lastMonth.setMonth(today.getMonth() - 1);

export const DUMMY_TASKS: Task[] = [
  {
    id: '1',
    title: 'Build Dashboard UI',
    description: 'Create a responsive layout using Tailwind CSS for the main dashboard view, including stat cards and task list.',
    priority: Priority.High,
    status: Status.InProgress,
    createdAt: formatDate(today),
  },
  {
    id: '2',
    title: 'Implement Authentication Flow',
    description: 'Set up context and hooks for user login, registration, and logout. Implement protected routes.',
    priority: Priority.High,
    status: Status.Completed,
    createdAt: formatDate(yesterday),
  },
  {
    id: '3',
    title: 'Develop CRUD for Tasks',
    description: 'Create functions to add, edit, delete, and view tasks. Manage state using TaskContext.',
    priority: Priority.Medium,
    status: Status.Pending,
    createdAt: formatDate(today),
  },
  {
    id: '4',
    title: 'Design Profile Page',
    description: 'Allow users to view and update their profile information. Ensure form validation is in place.',
    priority: Priority.Low,
    status: Status.Pending,
    createdAt: formatDate(lastWeek),
  },
  {
    id: '5',
    title: 'Add Search and Filter',
    description: 'Implement functionality to search tasks by title and filter by status and priority.',
    priority: Priority.Medium,
    status: Status.InProgress,
    createdAt: formatDate(twoDaysAgo),
  },
  {
    id: '6',
    title: 'Create 404 Page',
    description: 'Design and implement a user-friendly 404 Not Found page for incorrect URLs.',
    priority: Priority.Low,
    status: Status.Completed,
    createdAt: formatDate(lastMonth),
  }
];