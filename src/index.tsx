import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if (module && module.hot) {
  module.hot.accept()
}

ReactDOM.render(<App name="RF" age={100} />, document.querySelector('#app'))
