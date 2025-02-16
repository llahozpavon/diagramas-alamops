import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const i18Instance = i18n.createInstance();

i18Instance
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init(
    {
      backend: {
        loadPath: '/lang/test_es.json', //* (WHEN USING WEBPACK DEV SERVER LIKE npm run start)
        // loadPath: 'http://127.0.0.1:5500/src/lang/test_es.json' //* (WHEN USING LIVE SERVER LIKE npm run local)
      },
      lng: 'es', // Default language
      fallbackLng: 'es', // Fallback language
      // interpolation: {
      //   escapeValue: false, // No escape variables dentro de traducciones
      // },
      // debug: true,
    },
    (err, t) => {
      if (err) {
        console.error('Error loading i18n configuration:', err);
      } else {
        console.info('i18n initialized successfully');
      }
    }
  );
export { i18Instance };
