import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',
    theme: {
    extend: {
      borderRadius: {
        'inherit': 'inherit',
      },
      keyframes: {
        morph: {
          '0%': { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' },
          '100%': { borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'scale-up': 'scale-up 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards',
      }
    },
  },

    plugins: [forms],
};
