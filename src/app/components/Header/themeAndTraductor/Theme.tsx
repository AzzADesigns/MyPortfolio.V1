'use client';
import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import ToggleButton from '../../ui/ToggleButton';

export const Theme = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div>
      <ToggleButton
        isDark={isDark}
        onToggle={() => setTheme(isDark ? 'light' : 'dark')}
        iconDark={<FaMoon className=" w-5 h-5 text-buttonColor" />}
        iconLight={<FaSun className=" w-5 h-5 text-buttonColor" />}
      />
    </div>
  );
};
