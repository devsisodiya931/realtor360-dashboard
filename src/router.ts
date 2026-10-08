import { useEffect, useState } from 'react'

// Hash routing: no server rewrites needed, so the build runs as static files (e.g. GitHub Pages).
const current = () => location.hash.slice(1) || '/'

export function useRoute() {
  const [path, setPath] = useState(current)
  useEffect(() => {
    const on = () => {
      setPath(current())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return path
}

export const go = (path: string) => (location.hash = path)
export const back = () => history.back()
