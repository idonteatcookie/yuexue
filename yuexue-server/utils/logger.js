const log4js = require('log4js')
log4js.configure(
  {
      appenders: {
          file: {
              type: 'file',
              filename: 'yuexue.log',
              maxLogSize: 10 * 1024 * 1024, // = 10Mb
              numBackups: 5, // keep five backup files
              compress: true, // compress the backups
              encoding: 'utf-8',
              mode: 0o0640,
              flags: 'w+'
          },
          out: {
              type: 'stdout'
          }
      },
      categories: {
          default: { appenders: ['file', 'out'], level: 'trace' }
      }
  }
)

module.exports = log4js