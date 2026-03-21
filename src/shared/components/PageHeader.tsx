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
      justify="space-between"
      align={{ base: 'flex-start', md: 'center' }}
      mb={8}
      spacing={4}
    >
      <Stack spacing={1}>
        <Heading size="lg">{title}</Heading>
        <Text color="gray.600">{description}</Text>
      </Stack>
      {action}
    </Stack>
  )
}
