// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          "spin-slow": "spin 3s linear infinite",
          "pulse-slow": "pulse 3s ease-in-out infinite",
        },
        colors: {
            background: 'hsl(var(--background) / <alpha-value>)',
            foreground: 'hsl(var(--foreground) / <alpha-value>)',
          }
      },
    },
    plugins: [
      forms,
    ],
  }