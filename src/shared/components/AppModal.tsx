import { CloseButton, Dialog } from '@chakra-ui/react'
import type { PropsWithChildren } from 'react'

type AppModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'cover'

type AppModalProps = PropsWithChildren<{
  title: string
  isOpen: boolean
  onClose: () => void
  size?: AppModalSize
}>

export function AppModal({
  title,
  children,
  isOpen,
  onClose,
  size = 'lg',
}: AppModalProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose()
        }
      }}
      placement='center'
      size={size}
    >
      <Dialog.Backdrop bg='blackAlpha.500' backdropFilter='blur(4px)' />
      <Dialog.Positioner px={4}>
        <Dialog.Content borderRadius='2xl'>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger asChild>
            <CloseButton position='absolute' top='3' insetEnd='3' />
          </Dialog.CloseTrigger>
          <Dialog.Body pb={6}>{children}</Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
