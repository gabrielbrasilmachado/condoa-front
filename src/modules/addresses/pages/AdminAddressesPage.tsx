import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { AddressForm } from '@/modules/addresses/components/AddressForm'
import { AddressesTable } from '@/modules/addresses/components/AddressesTable'
import { useAddresses } from '@/modules/addresses/hooks/useAddresses'
import { useCreateAddress } from '@/modules/addresses/hooks/useCreateAddress'
import { useDeleteAddress } from '@/modules/addresses/hooks/useDeleteAddress'
import { useUpdateAddress } from '@/modules/addresses/hooks/useUpdateAddress'
import type { AddressFormData } from '@/modules/addresses/schemas/address-form.schema'
import type { Address } from '@/modules/addresses/types/address.types'
import { useCondominiums } from '@/modules/condominiums/hooks/useCondominiums'
import { AppModal } from '@/shared/components/AppModal'
import { EmptyState } from '@/shared/components/EmptyState'
import { LoadingState } from '@/shared/components/LoadingState'
import { PageHeader } from '@/shared/components/PageHeader'
import { toaster } from '@/shared/components/ui/toaster'
import { getErrorMessage } from '@/shared/lib/http/http-error'

export function AdminAddressesPage() {
  const formModal = useDisclosure()
  const { data, isLoading } = useAddresses()
  const { data: condominiumsData, isLoading: isLoadingCondominiums } =
    useCondominiums()
  const createMutation = useCreateAddress()
  const updateMutation = useUpdateAddress()
  const deleteMutation = useDeleteAddress()
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

  const addresses = data ?? []
  const condominiums = condominiumsData ?? []

  function closeFormModal() {
    setSelectedAddress(null)
    formModal.onClose()
  }

  function openCreateModal() {
    setSelectedAddress(null)
    formModal.onOpen()
  }

  function openEditModal(address: Address) {
    setSelectedAddress(address)
    formModal.onOpen()
  }

  async function handleCreate(values: AddressFormData) {
    try {
      await createMutation.mutateAsync(values)
      closeFormModal()
      toaster.success({ title: 'Endereço criado com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  async function handleUpdate(values: AddressFormData) {
    if (!selectedAddress) {
      return
    }

    try {
      await updateMutation.mutateAsync({
        id: selectedAddress.id,
        payload: values,
      })
      closeFormModal()
      toaster.success({ title: 'Endereço atualizado com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  async function handleDelete(address: Address) {
    try {
      await deleteMutation.mutateAsync(address.id)
      toaster.success({ title: 'Endereço removido com sucesso.' })
    } catch (error) {
      toaster.error({ title: getErrorMessage(error) })
    }
  }

  if (isLoading || isLoadingCondominiums) {
    return <LoadingState />
  }

  return (
    <>
      <PageHeader
        title='Endereços'
        description='Gerencie os endereços vinculados aos condomínios.'
        action={<Button onClick={openCreateModal}>Novo endereço</Button>}
      />

      {!addresses.length ? (
        <EmptyState message='Nenhum endereço cadastrado até o momento.' />
      ) : (
        <AddressesTable
          addresses={addresses}
          deletingAddressId={deleteMutation.isPending ? deleteMutation.variables : null}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      )}

      <AppModal
        isOpen={formModal.open}
        onClose={closeFormModal}
        title={selectedAddress ? 'Editar endereço' : 'Novo endereço'}
        size='xl'
      >
        <Text mb={5} color='gray.600'>
          Informe o CEP para preencher logradouro, bairro, cidade e estado automaticamente.
        </Text>
        <AddressForm
          address={selectedAddress}
          condominiums={condominiums}
          isLoading={createMutation.isPending || updateMutation.isPending}
          onCancel={closeFormModal}
          onSubmit={selectedAddress ? handleUpdate : handleCreate}
        />
      </AppModal>
    </>
  )
}
