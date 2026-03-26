import { SimpleGrid, type SimpleGridProps } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

export function ResponsiveFormGrid({
  children,
  ...props
}: PropsWithChildren<SimpleGridProps>) {
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5} {...props}>
      {children}
    </SimpleGrid>
  )
}
