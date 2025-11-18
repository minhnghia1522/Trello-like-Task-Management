'use client';

import { useEffect } from 'react';
import { useTaskStore } from '@/store/useTaskStore';

export const useDarkMode = () => {
  const { darkMode, toggleDarkMode } = useTaskStore();

  useEffect(() => {
    // Initialize dark mode from localStorage
    if (typeof window !== 'undefined') {
      const savedDarkMode = localStorage.getItem('darkMode');
      const isDark = savedDarkMode ? JSON.parse(savedDarkMode) : true;

      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  return { darkMode, toggleDarkMode };
};
