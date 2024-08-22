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
  },
  plugins: [require('tailwindcss-animated'), require('daisyui')],
};
