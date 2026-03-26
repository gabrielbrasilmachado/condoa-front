import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Item, ItemStatus } from '@/modules/items/types/item.types'

const itemStatusColorMap: Record<ItemStatus, 'green' | 'yellow' | 'red'> = {
  available: 'green',
  donated: 'yellow',
  expired: 'red',
}

const itemStatusLabelMap: Record<ItemStatus, string> = {
  available: 'Disponível',
  donated: 'Doado',
  expired: 'Expirado',
}

const swipeThreshold = 40

type ItemCardProps = {
  item: Item
  actions?: ReactNode
  showDefaultAccessAction?: boolean
  showOwnerName?: boolean
}

export function ItemCard({
  item,
  actions,
  showDefaultAccessAction = true,
  showOwnerName = true,
}: ItemCardProps) {
  const orderedImages = [...item.images].sort((firstImage, secondImage) => {
    if (firstImage.is_primary === secondImage.is_primary) {
      return 0
    }

    return firstImage.is_primary ? -1 : 1
  })

  const pointerStartXRef = useRef<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const currentImage = orderedImages[currentImageIndex]
  const hasMultipleImages = orderedImages.length > 1

  function showPreviousImage() {
    setCurrentImageIndex((currentIndex) =>
      currentIndex === 0 ? orderedImages.length - 1 : currentIndex - 1,
    )
  }

  function showNextImage() {
    setCurrentImageIndex((currentIndex) =>
      currentIndex === orderedImages.length - 1 ? 0 : currentIndex + 1,
    )
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    if (!hasMultipleImages) {
      return
    }

    pointerStartXRef.current = event.clientX
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!hasMultipleImages || pointerStartXRef.current === null) {
      return
    }

    const deltaX = event.clientX - pointerStartXRef.current
    pointerStartXRef.current = null

    if (Math.abs(deltaX) < swipeThreshold) {
      return
    }

    if (deltaX < 0) {
      showNextImage()
      return
    }

    showPreviousImage()
  }

  function handlePointerCancel() {
    pointerStartXRef.current = null
  }

  return (
    <Box
      bg='rgba(248,250,248,0.9)'
      borderRadius='xl'
      boxShadow='sm'
      border='1px solid'
      borderColor='whiteAlpha.500'
      p={3}
      mx='auto'
      w='full'
    >
      <Box
        bg='rgba(255,255,255,0.42)'
        borderRadius='lg'
        p={3}
        position='relative'
        border='1px solid'
        borderColor='whiteAlpha.400'
      >
        <Box
          aspectRatio={1.2}
          w='full'
          overflow='hidden'
          borderRadius='lg'
          bg='rgba(255,255,255,0.56)'
          display='grid'
          placeItems='center'
          position='relative'
          cursor={hasMultipleImages ? 'grab' : 'default'}
          touchAction='pan-y'
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerCancel}
        >
          {currentImage ? (
            <Image src={currentImage.url} alt={item.name} w='full' h='full' objectFit='cover' />
          ) : (
            <Box color='gray.600' fontWeight='medium'>
              Sem imagem
            </Box>
          )}

          {hasMultipleImages ? (
            <>
              <IconButton
                aria-label='Imagem anterior'
                size='sm'
                variant='solid'
                colorPalette='gray'
                position='absolute'
                left={2}
                top='50%'
                transform='translateY(-50%)'
                onClick={showPreviousImage}
              >
                <FiChevronLeft />
              </IconButton>

              <IconButton
                aria-label='Próxima imagem'
                size='sm'
                variant='solid'
                colorPalette='gray'
                position='absolute'
                right={2}
                top='50%'
                transform='translateY(-50%)'
                onClick={showNextImage}
              >
                <FiChevronRight />
              </IconButton>
            </>
          ) : null}
        </Box>

        <HStack justify='center' gap={2} mt={3} minH='8px'>
          {hasMultipleImages
            ? orderedImages.map((image, index) => (
                <Box
                  key={image.id}
                  boxSize='8px'
                  borderRadius='full'
                  bg={index === currentImageIndex ? 'green.500' : 'gray.300'}
                  cursor='pointer'
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))
            : null}
        </HStack>
      </Box>

      <Stack gap={2} align='center' textAlign='center' pt={3} px={1}>
        <HStack justify='space-between' w='full' align='center'>
          <Badge
            colorPalette='gray'
            px={3}
            py={1.5}
            fontSize='sm'
            fontWeight='semibold'
            borderRadius='md'
          >
            {item.category.name}
          </Badge>
          <Badge
            colorPalette={itemStatusColorMap[item.status]}
            px={3}
            py={1.5}
            fontSize='sm'
            fontWeight='semibold'
            borderRadius='md'
            bg={
              item.status === 'available'
                ? 'green.600'
                : item.status === 'donated'
                  ? 'yellow.500'
                  : 'red.600'
            }
            color={item.status === 'donated' ? 'gray.900' : 'white'}
          >
            {itemStatusLabelMap[item.status]}
          </Badge>
        </HStack>

        <Stack gap={0.5} w='full'>
          <Heading size='md' lineClamp='2' minH='2rem' w='full'>
            {item.name}
          </Heading>

          {showOwnerName ? (
            <Text w='full' fontSize='sm' color='gray.700'>
              Postado por: {item.user.name}
            </Text>
          ) : null}
        </Stack>

        {actions ? <HStack w='full' gap={2}>{actions}</HStack> : null}

        {showDefaultAccessAction ? (
          <Button
            asChild
            w='full'
            colorPalette='green'
            borderRadius='full'
            size='sm'
            fontWeight='semibold'
            color='white'
          >
            <Link to={`/app/user/items/${item.id}`}>Acessar</Link>
          </Button>
        ) : null}
      </Stack>
    </Box>
  )
}
