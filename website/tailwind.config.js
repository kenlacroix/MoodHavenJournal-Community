/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',        // App Router
    './components/**/*.{js,ts,jsx,tsx}',  // Shared components
    './src/**/*.{js,ts,jsx,tsx}',         // If you enabled the "src/" option
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
