import { parse, format } from 'date-fns'

export class FormatDate {
  static async formatDateToBbStandard (date) {
    const dataFormatada = format(parse(date, 'dd MMM yyyy', new Date()), 'yyyy-MM-dd')
    return new Date(dataFormatada)
  }
}
