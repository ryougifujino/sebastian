import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import App from './App'

if (module && module.hot) {
  module.hot.accept()
}

ReactDOM.render(<App />, document.querySelector('#app'))
