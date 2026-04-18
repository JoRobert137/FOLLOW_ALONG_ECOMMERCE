<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        midnight: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
          lighter: '#334155',
        },
        amber: {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
        },
      },
    },
  },
  plugins: [],
};
=======
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
>>>>>>> 9c0bbc9cbb90f2814188cdd88fedcc910e139fb3
