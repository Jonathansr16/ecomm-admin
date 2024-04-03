/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {},
};
export const plugins = [
  [
    "postcss-preset-env",
    {
      // Options
    },
    
    {

      'postcss-import': {},
    }, 
    {
      tailwindcss: {},
    },

    {

      autoprefixer: {},
    }


  ],
];

