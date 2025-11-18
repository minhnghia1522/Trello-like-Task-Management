import { useMemo } from 'react';
import { useTaskStore } from '@/store/useTaskStore';
import { filterTasks } from '@/utils/taskUtils';

export const useFilteredTasks = () => {
  const { tasks, filters } = useTaskStore();

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, filters);
  }, [tasks, filters]);

  return filteredTasks;
};
