import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import { initFontAwesome } from 'style/Icon/fontAwesome'

import App from 'App'

import 'style/index.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.min.css'

initFontAwesome()

ReactDOM.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="bottom-right" />
  </React.StrictMode>,
  document.getElementById('root')
)
