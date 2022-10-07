import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

export const formatDate = (date: Date) => {
  return format(date, 'dd/MM/yyyy HH:mm', {
    locale: pt
  })
}

export function getLastSixMonths() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  const months = []

  for (let month = currentMonth - 5; month <= currentMonth; month++) {
    months.push(month)
  }

  return months
}

export const months = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];