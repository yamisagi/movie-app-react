/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // Eğer Tailwind'in default Theme ayarları yerine kendimizinkini eklemek istemiyorsak mutlaka
    // { extend } içinde eklememiz gerekli
    // Yoksa tüm Theme objesi değişir ve kendi eklediklerimiz dışındakileri kullanamayız.
    extend: {
      colors: {
        "gray-dark-main": "#23242a",
        "gray-dark-second": "#28292d",
        "gray-light": "#d3dce6",
        "red-main": "#ff4b45",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
