'use client';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function InitializeColorScheme() {
  useEffect(() => {
    let theme = localStorage.getItem('theme');
    // If dark mode
    if (!theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'dark';
      } else {
        theme = 'light';
      }
    }

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.add(theme);
    document.documentElement.classList.remove('hidden');
  }, []);

  return null;
}
