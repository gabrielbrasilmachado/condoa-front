import {
  Select,
  createListCollection,
  type SelectRootProps,
} from '@chakra-ui/react'

type AppSelectOption = {
  label: string
  value: string
}

type AppSelectProps = {
  options: AppSelectOption[]
  value?: string | null
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  name?: string
  onChange: (value: string) => void
} &
  Omit<
    SelectRootProps<AppSelectOption>,
    'collection' | 'value' | 'onValueChange' | 'onChange'
  >

export function AppSelect({
  options,
  value,
  placeholder,
  clearable,
  disabled,
  name,
  onChange,
  size,
  ...props
}: AppSelectProps) {
  const collection = createListCollection({ items: options })

  return (
    <Select.Root
      collection={collection}
      value={value ? [value] : []}
      disabled={disabled}
      size={size}
      positioning={{ sameWidth: true }}
      onValueChange={(details) => {
        onChange(details.value[0] ?? '')
      }}
      {...props}
    >
      <Select.HiddenSelect name={name} />
      <Select.Control>
        <Select.Trigger bg='white' borderColor='blackAlpha.200'>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          {clearable ? <Select.ClearTrigger /> : null}
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          {collection.items.map((item) => (
            <Select.Item key={item.value} item={item}>
              <Select.ItemText>{item.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select.Root>
  )
}

export type { AppSelectOption }
