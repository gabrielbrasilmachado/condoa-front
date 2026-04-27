import { FaWhatsapp } from 'react-icons/fa6'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useMemo, useRef, useState, type PointerEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useItemById } from '@/modules/items/hooks/useItemById'
import { ItemDetailsSkeleton } from '@/modules/items/components/ItemDetailsSkeleton'
import type { ItemDetailsImage, ItemStatus } from '@/modules/items/types/item.types'
import { EmptyState } from '@/shared/components/EmptyState'
import { PageHeader } from '@/shared/components/PageHeader'

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

function normalizeWhatsappPhone(phone: string) {
  const digitsOnly = phone.replace(/\D/g, '')

  if (!digitsOnly) {
    return ''
  }

  return digitsOnly.startsWith('55') ? digitsOnly : `55${digitsOnly}`
}

function sortImages(images: ItemDetailsImage[]) {
  return [...images].sort((firstImage, secondImage) => {
    if (firstImage.isPrimary === secondImage.isPrimary) {
      return 0
    }

    return firstImage.isPrimary ? -1 : 1
  })
}

export function ItemDetailsPage() {
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const itemQuery = useItemById(id)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const pointerStartXRef = useRef<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isCurrentImageLoaded, setIsCurrentImageLoaded] = useState(false)

  const item = itemQuery.data
  const orderedImages = useMemo(() => sortImages(item?.images ?? []), [item?.images])
  const currentImage = orderedImages[currentImageIndex]
  const hasMultipleImages = orderedImages.length > 1

  const whatsappPhone = item ? normalizeWhatsappPhone(item.user.phone) : ''
  const whatsappMessage = item
    ? `Olá, vim pelo site do ConDoa.\nVi seu item ${item.name} e tenho interesse!`
    : ''
  const whatsappLink = item && whatsappPhone
    ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`
    : ''

  useEffect(() => {
    if (orderedImages.length === 0) {
      setCurrentImageIndex(0)
      return
    }

    setCurrentImageIndex((currentIndex) =>
      currentIndex >= orderedImages.length ? 0 : currentIndex,
    )
  }, [orderedImages.length])

  useEffect(() => {
    setIsCurrentImageLoaded(!currentImage)
  }, [currentImage])

  useEffect(() => {
    if (!currentImage || !imageRef.current) {
      return
    }

    if (imageRef.current.complete) {
      setIsCurrentImageLoaded(true)
    }
  }, [currentImage])

  useEffect(() => {
    if (!hasMultipleImages || orderedImages.length < 2) {
      return
    }

    const nextImageIndex =
      currentImageIndex === orderedImages.length - 1 ? 0 : currentImageIndex + 1
    const nextImageUrl = orderedImages[nextImageIndex]?.url

    if (!nextImageUrl) {
      return
    }

    const image = new window.Image()
    image.src = nextImageUrl
  }, [currentImageIndex, hasMultipleImages, orderedImages])

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

  if (itemQuery.isLoading && !item) {
    return <ItemDetailsSkeleton />
  }

  if (itemQuery.isError || !item) {
    return <EmptyState message='Não foi possível carregar os detalhes deste item.' />
  }

  return (
    <Stack gap={6}>
      <PageHeader
        title={item.name}
        description='Confira as informações do item e entre em contato com quem publicou.'
        action={
          <Button variant='outline' onClick={() => navigate(-1)}>
            Voltar
          </Button>
        }
      />

      <Box bg='rgba(248,250,248,0.9)' borderRadius='xl' boxShadow='sm' p={{ base: 4, md: 6 }}>
        <Stack gap={5}>
          <Box bg='gray.50' borderRadius='xl' p={{ base: 3, md: 4 }} maxW={{ base: 'full', lg: '720px' }} mx='auto'>
            <Box
              aspectRatio={{ base: 1, md: 1.15, lg: 1.2 }}
              w='full'
              maxW={{ base: 'full', md: '640px', lg: '680px' }}
              mx='auto'
              overflow='hidden'
              borderRadius='xl'
              bg='rgba(248,250,248,0.9)'
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
                <Skeleton
                  loading={!isCurrentImageLoaded}
                  position='absolute'
                  inset='0'
                  borderRadius='inherit'
                />
              ) : null}

              {currentImage ? (
                <Image
                  ref={imageRef}
                  src={currentImage.url}
                  alt={item.name}
                  w='full'
                  h='full'
                  objectFit='cover'
                  opacity={isCurrentImageLoaded ? 1 : 0}
                  transition='opacity 0.2s ease'
                  onLoad={() => setIsCurrentImageLoaded(true)}
                  onError={() => setIsCurrentImageLoaded(true)}
                />
              ) : (
                <Text color='gray.500' fontWeight='medium'>
                  Sem imagem
                </Text>
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

          <HStack justify='space-between' align='center' flexWrap='wrap' gap={3}>
            <Badge colorPalette='gray' px={3} py={1} borderRadius='full'>
              {item.category.name}
            </Badge>
            <Badge
              colorPalette={itemStatusColorMap[item.status]}
              px={3}
              py={1}
              borderRadius='full'
            >
              {itemStatusLabelMap[item.status]}
            </Badge>
          </HStack>

          <Box>
            <Text fontWeight='semibold' mb={2}>
              Descrição
            </Text>
            <Text color='gray.700' whiteSpace='pre-line'>
              {item.description}
            </Text>
          </Box>
        </Stack>
      </Box>

      <Box bg='rgba(248,250,248,0.9)' borderRadius='xl' boxShadow='sm' p={{ base: 4, md: 6 }}>
        <Stack gap={4}>
          <Heading size='md'>Publicado por</Heading>

          <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 4, md: 6 }} align={{ base: 'stretch', md: 'flex-start' }}>
            <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 6 }} flex='1'>
              <Box flex='1'>
                <Text fontSize='sm' color='gray.700'>
                  Nome
                </Text>
                <Text fontWeight='medium'>{item.user.name}</Text>
              </Box>

              <Box flex='1'>
                <Text fontSize='sm' color='gray.700'>
                  Telefone
                </Text>
                <Text fontWeight='medium'>{item.user.phone}</Text>
              </Box>
            </Stack>

            <Box>
              {whatsappLink ? (
                <Button
                  asChild
                  colorPalette='green'
                  borderRadius='full'
                  size='sm'
                  fontWeight='semibold'
                  color='white'
                >
                  <Link href={whatsappLink} target='_blank' rel='noreferrer' _hover={{ textDecoration: 'none' }}>
                    <Icon as={FaWhatsapp} boxSize={5} />
                    Entre em contato
                  </Link>
                </Button>
              ) : (
                <Text color='gray.500'>Telefone indisponível</Text>
              )}
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}

