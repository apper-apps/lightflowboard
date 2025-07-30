/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f0fe',
          100: '#e5e3fd',
          200: '#cecafc',
          300: '#aca5f9',
          400: '#8b7fe8',
          500: '#5b47e0',
          600: '#4c37d4',
          700: '#3f2bb8',
          800: '#352594',
          900: '#2e2276',
        },
        accent: {
          50: '#e6fff9',
          100: '#b3fff0',
          200: '#80ffe6',
          300: '#4dffdd',
          400: '#1affd3',
          500: '#00d4aa',
          600: '#00a688',
          700: '#007866',
          800: '#004a44',
          900: '#001c22',
        },
        surface: '#ffffff',
        background: '#f8f9fc',
        success: '#00c853',
        warning: '#ffb800',
        error: '#ff3b3b',
        info: '#2196f3',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0 2px 6px rgba(0, 0, 0, 0.1)',
        'elevation-4': '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}