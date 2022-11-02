/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./src/Components/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        'nav':['Mukta', 'ui-sans-serif'],
        'head':['Montserrat','ui-sans-serif'],
        'sign-up':['Courgette', 'ui-serif']
      },  
      width:{
        "w-30%":"30%",
        "w-45%":"45%"
      },
      minHeight:{
        "h-32":"8rem"
      }
  }},
  plugins: [],
}