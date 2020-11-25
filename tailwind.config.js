module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
    // defaultLineHeights: true,
    // standardFontWeights: true
  },
  purge: [],
  theme: {
    extend: {
      boxShadow: {
        '2xs': '0 0 20px 1px rgba(0, 0, 0, 0.05)'
      }
    },
    customForms: theme => ({
      semi: {
        'checkbox': {
          icon: '<svg fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path d="M5 9 L6 8 H14 L15 9 V11 L14 12 H6 L5 11 Z"/></svg>'
        }
      }
    })
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    transitionProperty: ['responsive', 'hover', 'focus']
  },
  plugins: [
    // require('@tailwindcss/custom-forms'),
    require('@tailwindcss/forms')
  ]
}
