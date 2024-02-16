/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'pYellow': '#f9fbf3',
        'pBrown': '#444041',
        'pOrange': '#f2d0b7',
        'pWhite': '#FFFFFF',
      },
      textColor: {
        'pYellow': '#f9fbf3',
        'pBrown': '#444041',
        'pOrange': '#f2d0b7',
        'pWhite': '#FFFFFF',
      },
      borderColor: {
        'pYellow': '#f9fbf3',
        'pBrown': '#444041',
        'pOrange': '#f2d0b7',
        'pWhite': '#FFFFFF',
      },
      fontSize: {
        'xs': '0.75rem',      // 12px
        'sm': '0.875rem',     // 14px
        'base': '1rem',       // 16px
        'lg': '1.125rem',     // 18px
        'xl': '1.25rem',      // 20px
        '2xl': '1.5rem',      // 24px
        '3xl': '1.875rem',    // 30px
        '4xl': '2.25rem',     // 36px
        '5xl': '3rem',        // 48px
        '6xl': '4rem',        // 64px
      },
      screens: {
        'xs': { max: '575px' },      // Extra Small devices (phones)
        'sm': '576px',               // Small devices (tablets)
        'md': '768px',               // Medium devices (desktops, laptops)
        'lg': '992px',               // Large devices (desktops)
        'xl': '1200px',              // Extra Large devices (large desktops)
        'xxl': '1360px',             // Extra Extra Large devices (larger desktops)
      },
    },
  },
  plugins: [],
}

