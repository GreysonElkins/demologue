import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { initFontAwesome } from 'style/Icon/fontAwesome'
import Providers from 'context'

import App from 'App'

import 'style/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'

initFontAwesome()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
