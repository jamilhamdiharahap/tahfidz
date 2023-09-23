/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderColor:{
        'bg-border' : '#DAD4B5'
      },
      borderWidth:{
        'border': '10px'
      }
    },
  },
  plugins: [],
}