import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

class ToolService {
  constructor() {}

  formatDate(date, format) {
    if (!date) return new Error('Date is required')
    if (!format) return new Error('Format is required')

    return dayjs(date).format(format)
  }

  formatFilename(fileName = '') {
    if (!fileName) return new Error('Filename is required')
    return fileName.trim().replace(/ /g, '_').toLocaleLowerCase()
  }
}

export default Object.freeze(new ToolService())
