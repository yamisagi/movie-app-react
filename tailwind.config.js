/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // Eğer Tailwind'in default Theme ayarları yerine kendimizinkini eklemek istemiyorsak mutlaka
    // { extend } içinde eklememiz gerekli
    // Yoksa tüm Theme objesi değişir ve kendi eklediklerimiz dışındakileri kullanamayız.
    extend: {
      colors: {
        'gray-dark-main': '#23242a',
        'gray-dark-second': '#28292d',
        'gray-light': '#d3dce6',
        'red-main': '#ff4b45',
        'dark-button': '#4c51bf',
        'dark-button-hover': '#38b2ac',
        'light-button': '#ff5c5c',
        'light-button-hover': '#e53e3e',
        'card-dark': '#2d3748',
        'card-light': '#edf2f7',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
