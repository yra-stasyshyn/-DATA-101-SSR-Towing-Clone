require("dotenv").config();

/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false
  // },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url(/img/banner-bg.webp)",
        contactButton: "url(/img/tire-btn-pattern.webp)",
        cta: "url(/img/call-to-action-bg.webp)",
        footer: "url(/img/footer-bg.webp)",
      },
      colors: {
        primary: "#25407a",
        secondary: "#83879d",
        hover:"#263045",
      },
      gridTemplateColumns: {
        review: "200px 1fr",
        blog: "230px 1fr",
        process: "50px 1fr",
        howTo: "60px 1fr",
        footer: "1fr 1fr 0.4fr 0.5fr",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
