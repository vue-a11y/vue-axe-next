module.exports = {
  prefix: 'va-',
  purge: false,
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  theme: {
    extend: {
      colors: {
        color: 'var(--va-color)',
        main: 'var(--va-bg)',
        primary: 'var(--va-primary)',
        secondary: 'var(--va-secondary)',
        critical: 'var(--va-critical)',
        serious: 'var(--va-serious)',
        moderate: 'var(--va-moderate)',
        minor: 'var(--va-minor)',
        notification: 'var(--va-notification)'
      }
    }
  },
  variants: {},
  plugins: []
}
