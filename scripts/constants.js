const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '..')
const isDev = process.env.NODE_ENV !== 'production'
const WEBPACK_PROGRESS_COLOR = '#008000'

module.exports = {
  PROJECT_PATH,
  isDev,
  WEBPACK_PROGRESS_COLOR,
}
