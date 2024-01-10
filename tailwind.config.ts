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
    'hidden',
    'border-red-400',
    'border-orange-400',
    'border-green-400',
    'border-blue-400',
    'border-sky-400',
    'border-gray-400',
    'checked:text-red-400',
    'checked:text-orange-400',
    'checked:text-green-400',
    'checked:text-blue-400',
    'checked:text-sky-400',
    'checked:text-gray-400',
    'bg-red-100',
    'bg-orange-100',
    'bg-green-100',
    'bg-blue-100',
    'bg-sky-100',
    'bg-gray-100',
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
    },
  },
  plugins: [require('daisyui'), require("@tailwindcss/forms")({
    strategy: 'class', // only generate classes
  })],
};
export default config;
