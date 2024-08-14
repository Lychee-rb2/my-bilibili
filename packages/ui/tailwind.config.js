/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    // eslint-disable-next-line no-undef
    require("@tailwindcss/aspect-ratio")
  ]
}
