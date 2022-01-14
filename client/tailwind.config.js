module.exports = {
  content: [  
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'faintBlue': '#F1F8F8',
        'head' : '#1A697A'
        
      },
      fontFamily: {
        'roboto': ['Roboto'],
        'body': ['Source Sans Pro'],
        'acme': ['Acme'],
        'head': ['Balsamiq Sans'],
        
      }
    },
  },
  plugins: [],
}
