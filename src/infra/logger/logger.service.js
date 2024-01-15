import chalk from 'chalk'
import { getCurrentTime } from '../../utils/date/hours.utils.js'

export class Logger {
  constructor (className) {
    this.className = className
  }

  /**
   * @param {'error, warn, verbose, debug, normal'} typeError
   * @param {string} message
   */
  dispatch (typeError, message) {
    message = `[express] ${new Date().toDateString()}, ${getCurrentTime()} [${this.className}] ${message}`

    switch (typeError) {
      case 'error':
        console.log(chalk.red(chalk.bold(message)))
        break
      case 'warn':
        console.log(chalk.yellow(message))
        break
      case 'verbose':
        console.log(chalk.blue(message))
        break
      case 'debug':
        console.log(chalk.magenta(message))
        break
      case 'normal':
        console.log(chalk.green(message))
        break
      default:
        console.log(chalk.gray(message))
    }
  }
}
