import {
  createSystem,
  defaultConfig,
  defineConfig,
} from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Trebuchet MS', sans-serif" },
        body: { value: "'Trebuchet MS', sans-serif" },
      },
      colors: {
        brand: {
          50: { value: '#f4f7f5' },
          100: { value: '#dfe8e2' },
          200: { value: '#bfd1c5' },
          300: { value: '#95b49f' },
          400: { value: '#6b987a' },
          500: { value: '#4e7e61' },
          600: { value: '#3d634c' },
          700: { value: '#2d4838' },
          800: { value: '#1c2d23' },
          900: { value: '#0d1813' },
        },
        accent: {
          500: { value: '#d97706' },
        },
      },
    },
  },
  globalCss: {
    body: {
      bg: 'brand.50',
      color: 'brand.900',
    },
  },
})

export const system = createSystem(defaultConfig, config)
