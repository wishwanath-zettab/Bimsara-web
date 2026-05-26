/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#e5322d',
          blue: '#0f64fa',
        },
        brand: {
          text: '#303548',
          about: '#464c55',
          dark: '#434343',
          'dark-border': '#242424',
          'contact-gray': '#f3f3f3',
          'member-gray': '#c4c4c4',
          'bg-line': '#ff969333',
          'member-border': '#ff96937d',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        khand: ['Khand', 'sans-serif'],
        'league-gothic': ['League Gothic', 'sans-serif'],
        'league-script': ['League Script', 'cursive'],
        'm-plus-2': ['M PLUS 2', 'sans-serif'],
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1199px',
        '2xl': '1920px',
      },
      keyframes: {
        moveBackground: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
      },
      animation: {
        'move-bg': 'moveBackground 20s linear infinite',
      },
      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
      },
    },
  },
  plugins: [],
  // Disable Tailwind's base reset to avoid conflicts during incremental SCSS migration
  corePlugins: {
    preflight: false,
  },
};
