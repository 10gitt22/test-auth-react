import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'clario-blue-200': '#CFE1F4',
        'clario-blue-300': '#6F91BC',
        'clario-blue-400': '#4A4E71',
        'clario-blue-800': '#151D51',
        success: '#27B274',
        error: '#FF8080'
      }
    },
  },
  plugins: [],
} satisfies Config

