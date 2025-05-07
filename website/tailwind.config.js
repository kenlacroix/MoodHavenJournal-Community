/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      maskImage: {
        'fade-edges':
          'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.6) 90%, rgba(0,0,0,0) 100%)',
      },
      keyframes: {
        scrollSlow: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'scroll-slow': 'scrollSlow 60s linear infinite',
        fadeUp: 'fadeUp 0.6s ease-out forwards',
      },
      animationDelay: {
        100: '100ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const delays = theme('animationDelay');
      const utilities = {};
      for (const key in delays) {
        utilities[`.delay-${key}`] = {
          animationDelay: delays[key],
        };
      }
      addUtilities(utilities, ['responsive']);
    }),
    // Existing plugin for mask-image
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'mask-image': (value) => ({
            maskImage: value,
            WebkitMaskImage: value,
          }),
        },
        { values: theme('maskImage') }
      );
    },
  ],
};
