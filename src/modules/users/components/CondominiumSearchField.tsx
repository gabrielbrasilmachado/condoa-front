import type { Condominium } from '@/modules/condominiums/types/condominium.types'
import { AppSelect } from '@/shared/components/AppSelect'

type CondominiumSearchFieldProps = {
  condominiums: Condominium[]
  value?: string | null
  placeholder?: string
  emptyLabel?: string
  onChange: (value?: string) => void
}

export function CondominiumSearchField({
  condominiums,
  value,
  placeholder,
  emptyLabel = 'Não atribuído',
  onChange,
}: CondominiumSearchFieldProps) {
  return (
    <AppSelect
      options={condominiums.map((condominium) => ({
        label: condominium.name,
        value: condominium.id,
      }))}
      value={value}
      placeholder={placeholder ?? emptyLabel}
      clearable
      onChange={(nextValue) => onChange(nextValue || undefined)}
    />
  )
}
