import { open } from '@tauri-apps/plugin-shell'

export default defineNuxtPlugin(() => {
  document.addEventListener('click', async (e) => {
    if (import.meta.env.PLATFORM_ENV !== 'native') return

    const anchor = (e.target as HTMLElement).closest('a')
    if (!anchor) return

    const href = anchor.getAttribute('href') ?? ''

    // Intercept mailto: and tel: only
    if (href.startsWith('mailto:') || href.startsWith('tel:')) {
      e.preventDefault()
      await open(href)
    }
  })
})
