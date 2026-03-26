import { Box, Heading, HStack, Stack, Text, type StackProps } from '@chakra-ui/react'
import type { PropsWithChildren, ReactNode } from 'react'

type FormSectionProps = PropsWithChildren<{
  title: string
  description?: string
  headerAction?: ReactNode
}> &
  StackProps

export function FormSection({
  title,
  description,
  headerAction,
  children,
  ...props
}: FormSectionProps) {
  return (
    <Stack
      gap={6}
      bg='rgba(248,250,248,0.9)'
      borderRadius='xl'
      boxShadow='sm'
      border='1px solid'
      borderColor='whiteAlpha.400'
      p={{ base: 5, md: 7 }}
      {...props}
    >
      <HStack justify='space-between' align='flex-start' gap={4} flexWrap='wrap'>
        <Box flex='1' minW='0'>
          <Heading size='md' color='gray.900'>{title}</Heading>
          {description ? (
            <Text mt={2} color='gray.700'>
              {description}
            </Text>
          ) : null}
        </Box>
        {headerAction ? <Box>{headerAction}</Box> : null}
      </HStack>
      {children}
    </Stack>
  )
}

