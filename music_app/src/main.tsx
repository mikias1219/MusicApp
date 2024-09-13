import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({
  reducer: {
    //user
  }
})



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} children={undefined}>

    </Provider>
    <App />
  </React.StrictMode>,
)
