import { addDays } from 'date-fns'
import { Platform } from 'react-native'

export function getPlataformDate(date: Date) {
  return addDays(date, 1)
}
