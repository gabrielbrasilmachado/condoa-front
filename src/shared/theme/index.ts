import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: "'Trebuchet MS', sans-serif",
    body: "'Trebuchet MS', sans-serif",
  },
  colors: {
    brand: {
      50: '#f4f7f5',
      100: '#dfe8e2',
      200: '#bfd1c5',
      300: '#95b49f',
      400: '#6b987a',
      500: '#4e7e61',
      600: '#3d634c',
      700: '#2d4838',
      800: '#1c2d23',
      900: '#0d1813',
    },
    accent: {
      500: '#d97706',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.50',
        color: 'brand.900',
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'green',
      },
    },
  },
})
