import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './ESP';
import en from './EN';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: ESP },
      en: { translation: EN }
    },
    lng: 'ESP', // idioma por defecto
    fallbackLng: 'ESP',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;