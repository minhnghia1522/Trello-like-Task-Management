'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  color?: string;
}

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  color = 'blue',
}: KPICardProps) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
          {trend && trendValue && (
            <div className="flex items-center space-x-1 mt-2">
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : trend === 'down' ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : null}
              <span
                className={`text-sm font-medium ${
                  trend === 'up'
                    ? 'text-green-500'
                    : trend === 'down'
                    ? 'text-red-500'
                    : 'text-gray-500'
                }`}
              >
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`${colorClasses[color]} p-3 rounded-lg`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
    </div>
  );
}
