export function formatZipCode(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 5) {
    return digits
  }

  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

export function normalizeZipCode(value: string) {
  return value.replace(/\D/g, '').slice(0, 8)
}

export function isValidZipCode(value: string) {
  const digits = normalizeZipCode(value)

  return digits.length === 8 && !/^(\d)\1+$/.test(digits)
}
