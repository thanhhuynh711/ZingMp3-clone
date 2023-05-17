/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        "main-100": "#393142",
        "main-200": "#221a2d",
        "main-300": "#170f23",
        "main-400": "#130c1c",
        "ovelay-30": "rgba(0,0,0,0.3)",
      },
      colors: {
        "main-100": "#393142",
        "main-200": "#221a2d",
        "main-300": "#170f23",
        "main-400": "#130c1c",
      },
      background: {
        "background-main":
          "url('./src/assets/img/download (1).jpg') top center / cover ",
      },

      keyframes: {
        "slide-right": {
          "0%": {
            " -webkit-transform": "translateX(-̀500px);",
            transform: "translateX(-500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "slide-left": {
          "0%": {
            " -webkit-transform": "translateX(500px);",
            transform: "translateX(500px);",
          },
          "100%": {
            "-webkit-transform": "translateX(0);",
            transform: "translateX(0);",
          },
        },
        "rotate-center": {
          "0%": {
            " -webkit-transform": "rotate(0);",
            transform: "rotate(0);",
          },
          "100%": {
            "-webkit-transform": "rotate(360deg);",
            transform: "rotate(360deg);",
          },
        },
        "scale-up-center": {
          "0%": {
            " -webkit-transform": "scale(0);",
            transform: "scale(0);",
          },
          "100%": {
            "-webkit-transform": "scale(1);",
            transform: "scale(1);",
          },
        },
        "scale-up-image": {
          "0%": {
            " -webkit-transform": "scale(1);",
            transform: "scale(1);",
          },
          "100%": {
            "-webkit-transform": "scale(1.2);",
            transform: "scale(1.2);",
          },
        },
        "scale-down-image": {
          "0%": {
            " -webkit-transform": "scale(1.2);",
            transform: "scale(1.2);",
          },
          "100%": {
            "-webkit-transform": "scale(1);",
            transform: "scale(1);",
          },
        },
      },
      animation: {
        "slide-right":
          "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left":
          "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "slide-left2":
          "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
        "rotate-center": "rotate-center 10s linear infinite",
        "scale-up-center":
          "scale-up-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-up-image":
          "scale-up-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "scale-down-image":
          "scale-down-image 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      flex: {
        4: "4 4 0%",
        6: "6 6 0%",
      },
    },
    screens: {
      i1600: "1600px",
    },
  },
  plugins: [],
};
