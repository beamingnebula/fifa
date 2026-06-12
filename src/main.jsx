import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FixturesProvider } from './context/FixturesContext.jsx'
import { registerSW } from 'virtual:pwa-register'

// Auto-register service worker
registerSW({ immediate: true })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FixturesProvider>
      <App />
    </FixturesProvider>
  </StrictMode>,
)
