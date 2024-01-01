import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js', // <--- Add this line
  ],
  safelist: [
    'border-red-400',
    'border-orange-300',
    'border-green-400',
    'border-blue-300',
    'border-sky-300',
    'checked:text-red-400',
    'checked:text-orange-300',
    'checked:text-green-400',
    'checked:text-blue-300',
    'checked:text-sky-300'
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
    },
  },
  plugins: [require('daisyui'), require("@tailwindcss/forms")],
};
export default config;
