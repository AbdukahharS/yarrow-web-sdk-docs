import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import uz from './locales/uz.json'
import ru from './locales/ru.json'

const messages = {
  en,
  uz,
  ru
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n