module.exports = {
  prefix: 'va-',
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    options: {
      whitelist: [
        'va-text-critical',
        'va-text-serious',
        'va-text-moderate',
        'va-text-minor'
      ],
      whitelistPatternsChildren: [
        /va-code-block$/
      ]
    },
    content: ['./src/**/*.vue']
  },
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
