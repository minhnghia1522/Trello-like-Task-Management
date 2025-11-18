import { format, formatDistanceToNow, isAfter, isBefore, parseISO } from 'date-fns';

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'No date';
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy');
  } catch {
    return 'Invalid date';
  }
};

export const formatDateTime = (dateString: string | null): string => {
  if (!dateString) return 'No date';
  try {
    return format(parseISO(dateString), 'MMM dd, yyyy HH:mm');
  } catch {
    return 'Invalid date';
  }
};

export const formatRelativeTime = (dateString: string | null): string => {
  if (!dateString) return 'No date';
  try {
    return formatDistanceToNow(parseISO(dateString), { addSuffix: true });
  } catch {
    return 'Invalid date';
  }
};

export const isOverdue = (dueDate: string | null): boolean => {
  if (!dueDate) return false;
  try {
    return isBefore(parseISO(dueDate), new Date());
  } catch {
    return false;
  }
};

export const isDueSoon = (dueDate: string | null, daysThreshold: number = 3): boolean => {
  if (!dueDate) return false;
  try {
    const due = parseISO(dueDate);
    const threshold = new Date();
    threshold.setDate(threshold.getDate() + daysThreshold);
    return isAfter(due, new Date()) && isBefore(due, threshold);
  } catch {
    return false;
  }
};
