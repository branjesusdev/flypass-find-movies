/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

module.exports = {
  content: ['./src/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}', './libs/**/*.{html,ts}'],
  },
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        body: ['fontRegularBody', 'system-ui', 'sans-serif'],
        bodyTwo: ['fontRegularBodyTwo', 'system-ui', 'sans-serif'],
        caption: ['fontRegularCaption', 'system-ui', 'sans-serif'],
        semiBold: ['fontSemiBold', 'system-ui', 'sans-serif'],
        bold: ['fontBold', 'system-ui', 'sans-serif'],
      },
    },
    colors: {
      ...colors,
      'primary-ui': 'var(--primary)',
      'secondary-ui': 'var(--secondary)',
      'accent-ui': 'var(--accent)',
    },
    animation: {
      'background-shine': 'background-shine 2s linear infinite',
    },
    keyframes: {
      'background-shine': {
        'from': {
          backgroundPosition: '0 0',
        },
        'to': {
          backgroundPosition: '-200% 0',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animated'), require('daisyui')],
};
