/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {    
    extend: {  
      colors: {
        'cor-tema1': '#007b5e',   // Altere aqui para a cor que deseja
        'cor-tema-claro': '#0f9979',
        'cor-destaque1': '#f47722',
        'cor-escura1': '#54585a',
        'cor-escura2': '#000000',
        'cor-branco': '#ffffff',      
      },    
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      boxShadow:{
        myShadow1: "4.1px -5px 0 0  rgb(241 245 249)",
        myShadow2: "-4.1px -5px 0 0  rgb(241 245 249)",
      }
    },
  },
  plugins: [],
}