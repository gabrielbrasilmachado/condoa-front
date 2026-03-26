import { SimpleGrid, type SimpleGridProps } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

export function ResponsiveCardGrid({
  children,
  ...props
}: PropsWithChildren<SimpleGridProps>) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 3, '2xl': 4 }} gap={5} {...props}>
      {children}
    </SimpleGrid>
  )
}
