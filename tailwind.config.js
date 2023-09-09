/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryTextColor: 'var(--primary-text-color)',
        secondaryTextColor: 'var(--secondary-text-color)',
        tertiaryTextColor: 'var(--tertiary-text-color)',
        quaternaryTextColor: 'var(--quaternary-text-color)',
        primaryBgColor: 'var(--primary-bg-color)', 
        secondaryBgColor: 'var(--secondary-bg-color)', 
        tertiaryBgColor: 'var(--tertiary-bg-color)',
        quaternaryBgColor: 'var(--quaternary-bg-color)',
        primaryBorderColor: 'var(--primary-border-color)',
        secondaryBorderColor: 'var(--secondary-border-color)',
        primaryBtnText: 'var(--primary-btn-text)',
        secondaryBtnText: 'var(--secondary-btn-text)',
        tertiaryBtnText: 'var(--tertiary-btn-text)',
        primaryRedius: 'var(--primary-radius-size: 6px)',
        secondaryRadius: 'var(--status-radius-size: 16px)',
        primaryTheme: 'var(--primary-theme-color)',
        errorTextColor: 'var(--error-text-color)',
      },
      fontFamily: {
        PrimaryFont: 'var(--primary-font)',
        RakutenLight: ['RakutenLight', 'sans-serif'],
        RakutenRegular: ['RakutenRegular', 'sans-serif'],
        RakutenSemibold: ['RakutenSemibold', 'sans-serif'],
        RakutenBold: ['RakutenBold', 'sans-serif'],
        RakutenBlack: ['RakutenBlack', 'sans-serif'],
        RakutenSansUISemiBold: ['RakutenSansUISemiBold', 'sans-serif'],
        RakutenSansUiBold: ['RakutenSansUiBold', 'sans-serif'],
      },
    },
  },
  plugins: []
};