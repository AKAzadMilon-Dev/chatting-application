/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        sml: "415px",
        md: "768px",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors:{
        primary: "#11175D",
        btn: "#5F35F5"
      }
    },
  },
  plugins: [],
};
