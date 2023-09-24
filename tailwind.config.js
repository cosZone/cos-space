module.exports = {
  darkMode: 'class', // https://tailwindcss.com/docs/dark-mode
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        xs: { max: '475px' },
        md: { max: '768px' },
        tablet: '640px',
        xl: '1366px',
        '2xl': '1366px',
      },
      colors: {
        primary: '#e91e63',
      },
      backgroundImage: {
        gradient: 'linear-gradient( 135deg, #fdfbfb 10%, #ebedee 100%)',
        'gradient-dark': 'linear-gradient(160deg, rgba(28,28,28,1) 0%, rgba(55,60,56,1) 100%)',
        'gradient-pink': 'linear-gradient(279deg, rgba(249,102,118,1) 0%, rgba(233,30,99,1) 100%)',
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
      },
    },
  },
  plugins: [],
};
