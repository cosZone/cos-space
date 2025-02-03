/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      xs: { max: '480px' },
      md: { max: '768px' },
      lg: { max: '1440px' },
      '2xl': '1440px',
      tablet: { max: '992px' },
      desktop: { min: '1480px' },
    },
    extend: {
      colors: {
        'gradient-start': 'var(--gradient-bg-start)',
        'gradient-end': 'var(--gradient-bg-end)',
        'gradient-shoka-button-start': 'var(--gradient-shoka-button-start)',
        'gradient-shoka-button-end': 'var(--gradient-shoka-button-end)',
        blue: {
          DEFAULT: 'hsl(var(--shoka-blue))',
        },
        gray: {
          400: 'hsl(var(--grey-4))',
        },
        // shadcn
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        logo: '#e91e63',
        mandy: {
          50: '#fef2f3',
          100: '#fde6e8',
          200: '#fbd0d4',
          300: '#f7aab2',
          400: '#f27a8a',
          500: '#e91e63',
          600: '#d42a4c',
          700: '#b21e3f',
          800: '#961b3b',
          900: '#801b38',
          950: '#470a1a',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        shake: 'shake 2s ease',
        'slide-down': 'slide-down 0.2s ease-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        gradient: 'var(--gradient-bg)',
        'gradient-pink': 'var(--gradient-pink)',
        'gradient-header': 'var(--gradient-header)',
        'gradient-shoka-button': 'var(--gradient-shoka-button)',
        'shoka-card-mask': 'linear-gradient(135deg,#434343 0,#000 100%)',
      },
      fontSize: {
        '4.5xl': '2.5rem',
        '5.5xl': '3.5rem',
      },
      fontFamily: {
        noto: 'Noto Serif SC',
        poppins: 'Poppins',
        candy: 'Candyshop',
        fg: 'Fredericka the Great',
        FZYS: '方正悠宋 简 509R',
      },
      clipPath: {
        'post-img-left': 'polygon(0 0,92% 0%,100% 100%,0% 100%)',
        'post-img-right': 'polygon(0 0%,100% 0%,100% 100%,8% 100%)',
      },
      spacing: {
        7.5: '1.875rem',
        8.5: '2.125rem',
        14.5: '3.625rem',
        15: '3.75rem',
        16.5: '4.125rem',
        17: '4.25rem',
        19: '4.75rem',
      },
      maxWidth: {
        '8xl': '87.5rem',
      },
      borderWidth: {
        16: '16px',
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries'), require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
