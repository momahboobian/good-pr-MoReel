/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    spacing: {
      some_key: {
        1.5: "1.5rem",
      },
    },
  },
  content: ["./**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
