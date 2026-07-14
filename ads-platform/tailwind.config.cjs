module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B5FFF',
        techgreen: '#00B894',
        glass: 'rgba(255,255,255,0.06)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial']
      },
      boxShadow: {
        glass: '0 8px 30px rgba(2,6,23,0.12)'
      },
      backdropBlur: {
        xs: '4px'
      }
    }
  },
  plugins: [],
}
