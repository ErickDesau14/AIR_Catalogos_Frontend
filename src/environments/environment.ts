// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  recursoUrl: 'http://localhost:8080/api/v1/r',
  tecnologiaUrl: 'http://localhost:8080/api/v1/t',
  puestoUrl: 'http://localhost:8080/api/v1/p',
  experienciaUrl: 'http://localhost:8080/api/v1/e',
  empresaUrl: 'http://localhost:8080/api/v1/e',
  archivoUrl: 'http://localhost:8080/api/v1/a/recurso',
  evaluacionUrl: 'http://localhost:8080/api/v1/e/recurso'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
