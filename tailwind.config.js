export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--ink)',
        dark: 'var(--ink)',
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        petrol: 'var(--ink)',
        aqua: 'var(--accent)',
        green: 'var(--green)',
        mint: 'var(--wash)',
        muted: 'var(--muted)',
        line: 'var(--line)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
}
