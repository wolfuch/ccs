import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// PrimeReact primero, para que los estilos propios de index.sass lo sobrescriban
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import './index.sass'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
