/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#050A14',
        'accent-cyan': '#00D4FF',
        'text-primary': '#F0F8FF',
        'text-secondary': '#8899AA',
        'critical': '#FF2D55',
        'high': '#FF6B00',
        'medium': '#FFD60A',
        'low': '#30D158',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-critical': '0 0 20px rgba(255, 45, 85, 0.4)',
      }
    },
  },
  plugins: [],
}
