import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'prompt' : ['Prompt','sans-serif'],
        'inter'  : ['Inter']
      },
      colors: {
        // Gold color palette
        'gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Blue color palette (overriding default blue)
        'blue': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Primary and secondary colors
        'primary': '#3b82f6', // blue-500
        'secondary': '#f59e0b', // gold-500
        // Legacy colors for backward compatibility
        'blueCustom': '#2984FF',
        'greyCustom': '#A8AFBD',
        'blackCustom': '#101010',
        'orangeCustom': '#f97316',
        'whiteCustom': '#FFFFFF',
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#3b82f6", // blue-500
          "secondary": "#f59e0b", // gold-500
          "accent": "#1e40af", // blue-800
          "neutral": "#374151", // gray-700
          "base-100": "#ffffff",
          "base-200": "#f9fafb", // gray-50
          "base-300": "#f3f4f6", // gray-100
          "info": "#3b82f6", // blue-500
          "success": "#10b981", // emerald-500
          "warning": "#f59e0b", // gold-500
          "error": "#ef4444", // red-500
        },
      },
    ],
  },
}