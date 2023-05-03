/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }
      lg: { max: "1121px" },
      sm: { max: "767px" },
    },
    extend: {
      width: {
        7.5: "1.875rem",
      },
      height: {
        7.5: "1.875rem",
      },
      maxWidth: {
        "desktop-full": "1216px",
      },
      colors: {
        lightWhite: "#ECE5FF",
        white: "#ffffff",
        'white-100': "rgba(255,255,255, .1)",
        mainBg: "#0F0823",
        redNotification: "#F55367",
        greenNotification: "#31B310",
        darkPurple: "#18122E",
        darkPurple2: "#1F123A",
        "darkPurple-850": "rgba(11, 6, 26, 0.85)",
        lightPurple: "#615683",
        lightPurple2: "#9FA3FF",
        pink: "#E644F8",
        darkPink: '#9E09E4',
        phlox: "#BE44F8",
        darkViolet: "#221741",
        darkViolet500: "rgba(34, 23, 65, 0.5)",
        darkViolet900: "rgba(34, 23, 65, 0.9)",
        blackMain: "#0C061B",
        lightPurpleDescription: "#5B588F",
        violet: "#9FA3FF",
        russianViolet: "#180F31",
        xiketic: "#0C061B",
        purple: "#5D1B9F",
        hanPurple: "#572ECD",
        lightViolet: "#ECE5FF",
        purpleNavy: "#5B588F",
        purpleNavy200: "rgba(91, 88, 143, .2)",
        lavander: "#8630DC",
        majorelle: "#6B46D5",
        uncommonNft: '#0FC70B',
        epicNft: '#298CFF',
        rareNft: '#AC29DA',
        legendaryNft: '#E9B500',
      },
      borderRadius: {
        2.5: "10px",
        5: "20px",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    plugin(({ addUtilities }) => {
      addUtilities({
        ".header-dialog-content": {
          display: "flex",
          alignSelf: "center",
          justifyContent: "center",
          margin: "4rem 0.5rem",
          padding: "0px",
          boxShadow: "rgb(0 0 0 / 5%) 0px 4px 8px 0px",
          width: "100vw",
          maxWidth: "480px",
          maxHeight: "100vh",
          outline: "none",
        },
        ".header-dialog-overlay": {
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 2147483610,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(31, 18, 58, 0.7)",
        },
      });
    }),
  ],
};
