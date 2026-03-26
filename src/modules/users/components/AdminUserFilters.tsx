import { FiChevronDown } from 'react-icons/fi'
import {
  Accordion,
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import type { Condominium } from '@/modules/condominiums/types/condominium.types'
import { CondominiumSearchField } from '@/modules/users/components/CondominiumSearchField'
import {
  userFiltersSchema,
  type UserFiltersFormData,
} from '@/modules/users/schemas/user-filters.schema'
import { AppField } from '@/shared/components/AppField'
import { AppSelect } from '@/shared/components/AppSelect'
import { ResponsiveFormGrid } from '@/shared/components/ResponsiveFormGrid'

type AdminUserFiltersProps = {
  initialValues: UserFiltersFormData
  condominiums: Condominium[]
  onSubmit: (values: UserFiltersFormData) => void
  onReset: () => void
}

export function AdminUserFilters({
  initialValues,
  condominiums,
  onSubmit,
  onReset,
}: AdminUserFiltersProps) {
  const [values, setValues] = useState<UserFiltersFormData>(initialValues)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  return (
    <Box bg='rgba(248,250,248,0.9)' borderRadius='xl' boxShadow='sm' overflow='hidden'>
      <Accordion.Root defaultValue={['filters']} multiple>
        <Accordion.Item value='filters' border='none'>
          <Accordion.ItemTrigger px={{ base: 5, md: 7 }} py={{ base: 5, md: 6 }}>
            <Box flex='1' textAlign='left'>
              <Heading size='md'>Filtros</Heading>
              <Text mt={2} color='gray.700'>
                Filtre por nome, e-mail e condomínio. A ordenação padrão é por
                data de cadastro, do mais recente para o mais antigo.
              </Text>
            </Box>
            <Accordion.ItemIndicator>
              <FiChevronDown />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody px={{ base: 5, md: 7 }} pb={{ base: 5, md: 7 }}>
              <Stack
                as='form'
                gap={5}
                onSubmit={(event) => {
                  event.preventDefault()
                  onSubmit(userFiltersSchema.parse(values))
                }}
              >
                <ResponsiveFormGrid>
                  <AppField label='Nome'>
                    <Input
                      bg='white'
                      placeholder='Buscar por nome'
                      value={values.name ?? ''}
                      onChange={(event) => {
                        setValues((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }}
                    />
                  </AppField>

                  <AppField label='E-mail'>
                    <Input
                      bg='white'
                      placeholder='Buscar por e-mail'
                      value={values.email ?? ''}
                      onChange={(event) => {
                        setValues((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }}
                    />
                  </AppField>

                  <AppField label='Condomínio'>
                    <CondominiumSearchField
                      condominiums={condominiums}
                      value={values.condominiumId}
                      placeholder='Selecione o condomínio'
                      onChange={(value) => {
                        setValues((current) => ({
                          ...current,
                          condominiumId: value ?? '',
                        }))
                      }}
                    />
                  </AppField>

                  <AppField label='Ordem de cadastro'>
                    <AppSelect
                      options={[
                        { value: 'desc', label: 'Mais recentes primeiro' },
                        { value: 'asc', label: 'Mais antigos primeiro' },
                      ]}
                      value={values.sortOrder}
                      onChange={(value) => {
                        setValues((current) => ({
                          ...current,
                          sortOrder: (value || 'desc') as 'asc' | 'desc',
                        }))
                      }}
                    />
                  </AppField>
                </ResponsiveFormGrid>

                <Stack direction={{ base: 'column', sm: 'row' }} gap={3}>
                  <Button type='submit'>Aplicar filtros</Button>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => {
                      const clearedValues: UserFiltersFormData = {
                        name: '',
                        email: '',
                        condominiumId: '',
                        sortOrder: 'desc',
                        perPage: initialValues.perPage,
                      }
                      setValues(clearedValues)
                      onReset()
                    }}
                  >
                    Limpar filtros
                  </Button>
                </Stack>
              </Stack>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Box>
  )
}
