/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        email: '#FFB900',
        section: '#EFEFEF',
        peerColor: '#f7cc10',
      },
      width: {
        PjtInfo: '612px',
        PjtCard: '590px',
        SectionW: '100%',
        Profile: '734px',
      },
      height: {
        PjtCard: '218px',
        PjtInfo: '623px',
        SectionH: '768px',
        Profile: '182px',
        pjtCardSection: '510px',
        fontFamily: {
          suite: ['SUITE', 'sans'],
        },
      },
      keyframes: {
        animatedgradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      animation: {
        gradient: 'animatedgradient 6s ease infinite alternate',
      },
    },
  },
  variants: {
    scrollbar: ['rounded'],
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
};
