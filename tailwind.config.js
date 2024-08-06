/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/client/components/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
