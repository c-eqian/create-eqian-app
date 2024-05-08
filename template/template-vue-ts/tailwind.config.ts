import type { Config } from 'tailwindcss'


export default {
  prefix: 'cz-',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  // 3.4
  darkMode: ['class', '[class="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

