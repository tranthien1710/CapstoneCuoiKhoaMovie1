/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {},
        height: {
            99: "55rem",
        }
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    }
}