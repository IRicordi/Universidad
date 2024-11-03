import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './Languages/en.js';
import es from './Languages/es.js';

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3', // Agregar esta línea
    resources: {
      es: { translation: es },
      en: { translation: en }
    },
    lng: 'es', // idioma por defecto
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;