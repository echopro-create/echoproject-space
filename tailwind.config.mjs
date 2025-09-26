/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx}", "./styles/**/*.{css}"],
  theme: {
    container: { center: true, padding: '1rem' },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#111111',
          subtle: '#1f1f1f'
        }
      },
      maxWidth: { prose: '72ch' },
      borderRadius: { xl: '12px' },
      height: { control: '44px' }
    }
  },
  plugins: []
}

