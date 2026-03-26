import { Heading, Stack, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type PageHeaderProps = {
  title: string
  description: string
  action?: ReactNode
}

export function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      justify='space-between'
      align={{ base: 'flex-start', md: 'center' }}
      mb={8}
      gap={4}
    >
      <Stack gap={1}>
        <Heading size='lg' color='white'>
          {title}
        </Heading>
        <Text color='whiteAlpha.800'>{description}</Text>
      </Stack>
      {action}
    </Stack>
  )
}
