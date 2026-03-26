import { Box, Button, Stack, Text } from '@chakra-ui/react'
import type { Condominium } from '@/modules/condominiums/types/condominium.types'

type AvailableCondominiumCardProps = {
  condominium: Condominium
  isRequestBlocked: boolean
  isLoading?: boolean
  onRequest: (condominium: Condominium) => void
}

export function AvailableCondominiumCard({
  condominium,
  isRequestBlocked,
  isLoading,
  onRequest,
}: AvailableCondominiumCardProps) {
  const address = condominium.address

  return (
    <Box
      bg='rgba(248,250,248,0.9)'
      borderRadius='xl'
      boxShadow='sm'
      border='1px solid'
      borderColor='whiteAlpha.500'
      p={5}
    >
      <Stack gap={4} h='full'>
        <Stack gap={1}>
          <Text fontSize='sm' color='gray.700'>
            Condomínio
          </Text>
          <Text fontSize='lg' fontWeight='semibold'>
            {condominium.name}
          </Text>
        </Stack>

        <Stack gap={1} flex='1'>
          <Text fontSize='sm' color='gray.700'>
            Endereço
          </Text>
          {address ? (
            <>
              <Text>{address.name}, {address.number}</Text>
              <Text color='gray.700'>
                {address.city} - {address.state}
              </Text>
              <Text color='gray.700'>CEP: {address.zipCode}</Text>
            </>
          ) : (
            <Text color='gray.700'>Endereço não cadastrado</Text>
          )}
        </Stack>

        <Button
          size='sm'
          colorPalette='green'
          disabled={isRequestBlocked}
          loading={isLoading}
          onClick={() => onRequest(condominium)}
        >
          Solicitar vínculo
        </Button>
      </Stack>
    </Box>
  )
}
