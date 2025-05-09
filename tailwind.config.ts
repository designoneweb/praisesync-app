
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        'praise-bg': '#FAF9F7', // Light page background
        'praise-sidebar': '#1E2A52', // Sidebar background
        'praise-text-dark': '#1E2A52', // Dark text (for light mode)
        'praise-accent': '#F4B860', // Gold accent
        'praise-card-bg': '#FFFFFF', // Card background (light mode)
        'praise-tip-bg': '#e9e4dd', // Tip section background (light mode)

        // Define dark mode colors here (prefixed with dark: in components or defined directly)
        'praise-dark-bg': '#111827', // Example: Dark page background (slate-900)
        'praise-dark-sidebar': '#1f2937', // Example: Dark sidebar (slate-800)
        'praise-dark-text': '#e5e7eb', // Example: Light text (slate-200)
        'praise-dark-card-bg': '#374151', // Example: Dark card bg (gray-700)
        'praise-dark-tip-bg': '#4b5563', // Example: Dark tip bg (gray-600)
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
