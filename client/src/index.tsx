import React from 'react'
import ReactDOM from 'react-dom'
import { initFontAwesome } from 'style/Icon/fontAwesome'

import App from 'App'

import 'style/index.scss'

initFontAwesome()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
