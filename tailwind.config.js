
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {

    },

    colors:{
      nav:"var(--nav)",
      texts:"var(--texts)",
      tasks:"var(--tasks)",
      viewInput:"var(--viewInput)",
      checkbox:"var(--checkbox)",
      buttons:"var(--buttons)"
    },

    screens: {
      'sm': '350px',

      'md': '768px',

      'xl': '1440px',
    }
  },

  variants: {
    fill: ['hover', 'focus'], // this line does the trick
  },

  plugins: [],
}