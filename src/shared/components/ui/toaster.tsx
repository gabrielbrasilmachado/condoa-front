import {
  CloseButton,
  Portal,
  Stack,
  Toast,
  Toaster,
  createToaster,
} from '@chakra-ui/react'

export const toaster = createToaster({
  placement: 'top-end',
  overlap: false,
  pauseOnPageIdle: true,
})

export function AppToaster() {
  return (
    <Portal>
      <Toaster toaster={toaster} insetInline={{ base: '4', md: '6' }}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <Toast.Indicator />
            <Stack gap='1' flex='1' maxW='100%'>
              {toast.title ? <Toast.Title>{toast.title}</Toast.Title> : null}
              {toast.description ? (
                <Toast.Description>{toast.description}</Toast.Description>
              ) : null}
            </Stack>
            <Toast.CloseTrigger asChild>
              <CloseButton size='sm' />
            </Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toaster>
    </Portal>
  )
}
