import { createContext, useCallback, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { langFromPath } from '../data/seo'
import { translations } from './translations'

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext(null)

/* The URL decides the language (/en/... = English), so every language
   version is its own crawlable page and the toggle is a plain link. */
export const LanguageProvider = ({ children }) => {
  const { pathname } = useLocation()
  const language = langFromPath(pathname)

  const t = useCallback(
    (key) => {
      let value = translations[language]
      for (const k of key.split('.')) {
        if (value == null) return key
        value = value[k]
      }
      return value ?? key
    },
    [language]
  )

  const value = useMemo(() => ({ language, t }), [language, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
