import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

export const formatDate = (date: Date) => {
  return format(date, 'dd/MM/yyyy HH:mm', {
    locale: pt
  })
}