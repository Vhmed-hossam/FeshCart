const { heroui } = require("@heroui/react");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        primary: "#2A7DDD",
        danger: "#E24A4A",
        success: "#4AE27D",
        black: "#080F17",
        background: "#F6F9FD",
        white: "#F6F9FD",
        gray: "#808080",
      },
      screens: {
        'xs': '500px',
      },
    },
  },
  
  plugins: [],
};