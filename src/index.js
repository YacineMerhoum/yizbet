import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './responsive.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </HelmetProvider>
)
