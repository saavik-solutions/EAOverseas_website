import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import '@/index.css'
import App from './App'
import { AuthProvider } from '@/shared/contexts/AuthContext'
import logoUrl from '@/assets/logo.webp'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)

