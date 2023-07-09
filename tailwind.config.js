/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    spacing: {
      some_key: {
        1.5: "1.5rem",
      },
    },
    borderWidth: {
      DEFAULT: "10px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
      // Add custom values here
      half: "30%",
    },
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customColors: {
          teamColor1: "#E2E949",
          teamColor2: "#36BCBA",
          teamColor3: "#f55706",
        },
      },
    },
    plugins: [],
  },
};
