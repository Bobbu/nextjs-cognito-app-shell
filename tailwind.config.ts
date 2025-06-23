import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Enables toggling with 'dark' class on <html>
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Inter"', "system-ui", "sans-serif"],
        heading: ['"Roboto"', "system-ui", "sans-serif"],
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      colors: {
        primary: {
          DEFAULT: "#FF7A00", // Your main brand orange
          light: "#FFA94D",
          dark: "#CC6300",
        },
        blue: {
          400: "#2589FE",
          500: "#0070F3",
          600: "#2F6FEB",
        },
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;


// import type { Config } from "tailwindcss";

// const config: Config = {
//   darkMode: "class", // Enables toggling with 'dark' class on <html>
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       gridTemplateColumns: {
//         "13": "repeat(13, minmax(0, 1fr))",
//       },
//       colors: {
//         blue: {
//           400: "#2589FE",
//           500: "#0070F3",
//           600: "#2F6FEB",
//         },
//       },
//     },
//     keyframes: {
//       shimmer: {
//         "100%": {
//           transform: "translateX(100%)",
//         },
//       },
//     },
//   },
//   plugins: [require("@tailwindcss/forms")],
// };
// export default config;
