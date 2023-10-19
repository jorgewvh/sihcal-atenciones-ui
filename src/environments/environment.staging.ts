// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API_LOOKUPS = "http://development.svc-lookups.ecms.setrass.net"; // lookups
const API_SALARY_HISTORY = "http://development.svc-salary-history.ecms.setrass.net"; // salary history
const API_CALCULO_PRESTACIONES = "http://development.svc-calc-prestaciones.ecms.setrass.net"; // calculo-prestaciones

export const environment = {
  production: true,
  appVersion: 'v0.0.2',

  API: {
    LOOKUPS_LOCATIONS: `${API_LOOKUPS}/locations`,
    SALARY_HISTORY: `${API_SALARY_HISTORY}`,
    CALCULO_PRESTACIONES: `${API_CALCULO_PRESTACIONES}`
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
