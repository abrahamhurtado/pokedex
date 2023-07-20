import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens: {
        colors: {
          normal: { value: 'rgb(168, 168, 120)' },
          fighting: { value: 'rgb(192, 48, 40)' },
          flying: { value: 'rgb(168, 144, 240)' },
          poison: { value: 'rgb(160, 64, 160)' },
          ground: { value: 'rgb(224, 192, 104)' },
          rock: { value: 'rgb(184, 160, 56)' },
          bug: { value: 'rgb(168, 184, 32)' },
          ghost: { value: 'rgb(112, 88, 152)' },
          steel: { value: 'rgb(184, 184, 208)' },
          fire: { value: 'rgb(240, 128, 48)' },
          water: { value: 'rgb(104, 144, 240)' },
          grass: { value: 'rgb(120, 200, 80)' },
          electric: { value: 'rgb(248, 208, 48)' },
          psychic: { value: 'rgb(248, 88, 136)' },
          ice: { value: 'rgb(152, 216, 216)' },
          dragon: { value: 'rgb(112, 56, 248)' },
          dark: { value: 'rgb(112, 88, 72)' },
          fairy: { value: 'rgb(238, 153, 172)' },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',

  jsxFramework: 'react',
});
