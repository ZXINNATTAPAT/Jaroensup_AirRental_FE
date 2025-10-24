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
        'kanit' : ['Kanit','sans-serif'],
        'inter'  : ['Inter','sans-serif']
      },
      colors: {
        // Pantone 109C Yellow color palette
        'yellow': {
          50: '#fffef7',
          100: '#fffceb',
          200: '#fff7d1',
          300: '#fff0a8',
          400: '#ffe570',
          500: '#FFCC00', // Pantone 109C
          600: '#e6b800',
          700: '#cc9900',
          800: '#b38600',
          900: '#996600',
        },
        // Pantone 293C Blue color palette
        'blue': {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7ff',
          300: '#a3bfff',
          400: '#7a9bff',
          500: '#003399', // Pantone 293C
          600: '#002d8a',
          700: '#00277a',
          800: '#00216b',
          900: '#001b5c',
        },
        // Primary and secondary colors
        'primary': '#003399', // Pantone 293C Blue
        'secondary': '#FFCC00', // Pantone 109C Yellow
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
          "primary": "#003399", // Pantone 293C Blue
          "secondary": "#FFCC00", // Pantone 109C Yellow
          "accent": "#002d8a", // blue-600
          "neutral": "#374151", // gray-700
          "base-100": "#ffffff",
          "base-200": "#f9fafb", // gray-50
          "base-300": "#f3f4f6", // gray-100
          "info": "#003399", // Pantone 293C Blue
          "success": "#10b981", // emerald-500
          "warning": "#FFCC00", // Pantone 109C Yellow
          "error": "#ef4444", // red-500
        },
      },
    ],
  },
}