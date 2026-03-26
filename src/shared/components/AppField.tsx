import { Field } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type AppFieldProps = {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
}

export function AppField({
  label,
  error,
  required,
  children,
}: AppFieldProps) {
  return (
    <Field.Root invalid={Boolean(error)} required={required}>
      <Field.Label>{label}</Field.Label>
      {children}
      {error ? <Field.ErrorText>{error}</Field.ErrorText> : null}
    </Field.Root>
  )
}
