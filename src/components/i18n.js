import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    ns: ['translations'],
    defaultNS: 'translations',
    whitelist: ['en', 'nl'],
    debug: false,
    interpolation: {
      escapeValue: false
    },
    react: {
      wait: true,
      defaultTransParent: 'span'
    }
  })

export default i18n
