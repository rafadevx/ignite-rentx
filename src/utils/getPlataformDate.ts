import { Platform } from "react-native";
import { addDays } from "date-fns"; 

export function getPlatformDate(date: Date) {
  return Platform.OS === 'ios' ? addDays(date, 1) : addDays(date, 1);
}