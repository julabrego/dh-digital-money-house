import { format } from "date-fns";
import { es } from "date-fns/locale";

export function spanishTextDate(date: Date) {
  return format(date, "d 'de' MMMM yyyy 'a' HH:mm'hs'", { locale: es });
}
