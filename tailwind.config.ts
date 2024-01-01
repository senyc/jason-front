import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js', // <--- Add this line
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
    },
  },
  plugins: [require('daisyui')],
};
export default config;
