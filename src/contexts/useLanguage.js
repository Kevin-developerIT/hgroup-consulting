import { useCallback, useContext } from 'react'
import { localizePath } from '../data/seo'
import { LanguageContext } from './LanguageContext'

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

/* Returns a function mapping a Spanish path to the current language's
   path — for navigate() calls. Links use <LocaleLink> instead. */
export const useLocalePath = () => {
  const { language } = useLanguage()
  return useCallback((to) => localizePath(to, language), [language])
}
