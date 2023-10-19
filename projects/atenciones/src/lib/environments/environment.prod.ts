const API_LOOKUPS = "https://prod.svc-lookups.ecms.setrass.net"; // lookups
const API_SALARY_HISTORY = "https://prod.svc-salary-history.ecms.setrass.net"; // salary history
const API_CALCULO_PRESTACIONES = "https://prod.svc-calc-prestaciones.ecms.setrass.net"; // calculo-prestaciones
const API_PATRONOS_EMPLEADORES = "https://prod.svc-patronos-empleadores.ecms.setrass.net";
const API_INSPECCION = "https://prod.svc-inspection.ecms.setrass.net"; // Inspeccion
const API_REGISTRO_ATENCIONES = "https://prod.svc-inspection.ecms.setrass.net"
const API_STAFF = "https://prod.svc-staff.ecms.setrass.net"; // Staff

export const environment = {
  production: true,
  appVersion: 'v0.0.2',

  API: {
    LOOKUPS_LOCATIONS: `${API_LOOKUPS}/locations`,
    LOOKUPS: `${API_LOOKUPS}`,
    SALARY_HISTORY: `${API_SALARY_HISTORY}`,
    CALCULO_PRESTACIONES: `${API_CALCULO_PRESTACIONES}`,
    PATRONOS_EMPLEADORES: `${API_PATRONOS_EMPLEADORES}`,
    INSPECCION: `${API_INSPECCION}`,
    REGISTRO_ATENCIONES:  `${API_REGISTRO_ATENCIONES}`,
    STAFF: `${API_STAFF}`,
  },

  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  apiUrl: 'api',
  appThemeName: 'Metronic',
  appPurchaseUrl: 'https://1.envato.market/EA4JP',
  appHTMLIntegration: 'https://preview.keenthemes.com/metronic8/stss-base-template-ui/documentation/base/helpers/flex-layouts.html',
  appPreviewUrl: 'https://preview.keenthemes.com/metronic8/angular/stss-base-template-ui/',
  appPreviewAngularUrl: 'https://preview.keenthemes.com/metronic8/angular/stss-base-template-ui',
  appPreviewDocsUrl: 'https://preview.keenthemes.com/metronic8/angular/docs',
  appPreviewChangelogUrl: 'https://preview.keenthemes.com/metronic8/angular/docs/changelog',
  appDemos: {
    'stss-base-template-ui': {
      'title': 'Demo 2',
      'description': 'SaaS Application',
      'published': true,
      'thumbnail': './assets/media/demos/stss-base-template-ui.png'
    },
  },
};
