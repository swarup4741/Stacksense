const { fontFamily } = require("tailwindcss/defaultTheme");
module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: false,
    theme: {
        colors: {
            indigo: {
                light: "#AA8BFF",
                DEFAULT: "#7442FF",
                dark: "#5530BE",
                active: "#5E30DD",
                darker: "#240068",
            },
            black: {
                DEFAULT: "#141429",
            },
            white: {
                DEFAULT: "#EAEAEA",
            },
            red: {
                DEFAULT: "#FF5353",
            },
            modalbg: {
                DEFAULT: "#111111",
            },
            dashbg: {
                DEFAULT: "#0B0B1F",
            },
            cardbg: {
                DEFAULT: "#0A0A26",
            },
        },
        fontSize: {
            xs: ".675rem",
            sm: ".875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            mobile: "2.5rem",
            "5xl": "3rem",
            "6xl": "4rem",
            "7xl": "5rem",
        },
        fontFamily: {
            sans: ["Product Sans", ...fontFamily.sans],
        },
        extend: {},
    },
    variants: {
        extend: {
            backgroundColor: ["active"],
            opacity: ["disabled"],
        },
    },
    plugins: [],
};
