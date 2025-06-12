'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { Tooltip } from 'react-tooltip';

const themes = [
  { value: 'light', label: 'Light', icon: <FiSun className="w-4 h-4" /> },
  { value: 'dark', label: 'Dark', icon: <FiMoon className="w-4 h-4" /> },
  { value: 'system', label: 'System', icon: <FiMonitor className="w-4 h-4" /> },
] as const;

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="rounded-md bg-gray-50 dark:bg-gray-800 p-4 md:p-6 w-full">
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
        Appearance
      </label>
      <div className="grid grid-cols-3 gap-2">
        {themes.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`w-full flex items-center justify-center gap-1 px-3 py-2 text-sm rounded border transition-colors
              ${
                theme === value
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            title={label}
            aria-label={`Set theme to ${label}`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
