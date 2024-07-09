/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-header': "url('/src/assets/images/rainbow.jpg')",
        'bg-landing': "url('/src/assets/images/landing.jpg')",
        'bg-login': "url('/src/assets/images/loginbg.jpeg')",
        'bg-about': "url('/src/assets/images/logisticbg.jpg')",
        'bg-partner': "url('/src/assets/images/bg-partner.png')",
      },
    },
  },
  plugins: [],
}