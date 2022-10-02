const localeCurrency = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
}

const onlyNumbers = (value: string) => {
  return Number(value.replace(/[^0-9]/g, ''))
}

export const floatFormat = (value: string) => {
  return onlyNumbers(value) / 100
}

export const priceFormat = (value: string | number) => {
  if (!value) return 'R$ 0,00'
  const newValue = floatFormat(String(value))
  if (!newValue) return ''
  const cleanNumber = typeof newValue === 'string' ? floatFormat(newValue) : newValue
  const formattedNumber = new Intl.NumberFormat('pt-BR', localeCurrency).format(cleanNumber)
  return formattedNumber
}