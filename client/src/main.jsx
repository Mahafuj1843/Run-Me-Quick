import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ExecutionContext from './context/ExecutionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ExecutionContext>
      <App />
    </ExecutionContext>
  </React.StrictMode>,
)
