import { Box, Image, Skeleton } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

type LandingCoverImageProps = {
  src: string
  alt: string
  overlay?: string
  loading?: 'eager' | 'lazy'
}

export function LandingCoverImage({
  src,
  alt,
  overlay,
  loading = 'lazy',
}: LandingCoverImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
  }, [src])

  useEffect(() => {
    if (imageRef.current?.complete) {
      setIsLoaded(true)
    }
  }, [src])

  return (
    <Box position='relative' w='full' h='full' overflow='hidden'>
      <Skeleton loading={!isLoaded} position='absolute' inset='0' />

      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        w='full'
        h='full'
        objectFit='cover'
        loading={loading}
        opacity={isLoaded ? 1 : 0}
        transition='opacity 0.24s ease'
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
      />

      {overlay ? (
        <Box position='absolute' inset='0' bg={overlay} pointerEvents='none' />
      ) : null}
    </Box>
  )
}
