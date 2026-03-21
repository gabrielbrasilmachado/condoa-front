import { Box, Heading, Text } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type InfoCardProps = {
  label: string
  value: string | number
  helper?: string
  icon?: ReactNode
}

export function InfoCard({ label, value, helper, icon }: InfoCardProps) {
  return (
    <Box bg="white" p={6} borderRadius="2xl" boxShadow="sm">
      <Text color="gray.500" fontSize="sm">
        {label}
      </Text>
      <Heading size="lg" mt={3}>
        {value}
      </Heading>
      {helper ? (
        <Text mt={2} color="gray.600">
          {helper}
        </Text>
      ) : null}
      {icon}
    </Box>
  )
}
