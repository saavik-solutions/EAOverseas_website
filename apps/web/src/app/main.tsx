import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import '@/index.css'
import App from './App'
import { AuthProvider } from '@/shared/contexts/AuthContext'
import logoUrl from '@/assets/logo.png'

// ── Global image fallback ──────────────────────────────────────────────────────
// Any <img> that fails to load anywhere in the app will automatically fall back
// to the EAOverseas logo. We use event delegation so it covers dynamically
// rendered images too. The `data-no-fallback` attribute opts an image out.
document.addEventListener(
  'error',
  (e) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'IMG' &&
      !(target as HTMLImageElement).dataset.noFallback &&
      (target as HTMLImageElement).src !== logoUrl
    ) {
      const img = target as HTMLImageElement;
      img.src = logoUrl;
      img.style.objectFit = 'contain';
      img.style.padding = '12px';
      img.style.background = 'linear-gradient(135deg, #f5f0ff, #fdf4ff)';
      img.style.filter =
        'brightness(0) saturate(100%) invert(18%) sepia(96%) saturate(2000%) hue-rotate(272deg) brightness(80%) opacity(50%)';
    }
  },
  true // capture phase so it fires before React's synthetic events
);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>,
)

