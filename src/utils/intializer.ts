import { HttpClient } from '@angular/common/http';
import { catchError, combineLatest, Observable, of, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { IPersonalApi } from '../interfaces/personal-api.interface';
import { inject } from '@angular/core';
import { IKeycloak } from '../interfaces/keycloak.interface';
import { IwellKnowKeycloak } from '../interfaces/IwellKnowKeycloak';


/**
 * @deprecated A remplacer avec la méthode : `detectionServerReady()`
 * @description Factory qui sert à detecter si les API sont actives
 * @description Initialiser dans AppModule
 * @param {HttpClient} httpClient
 * @return {() => Observable<[Object, Object]>}
 * @author Samakunchan
 * @example ```ts
 *   providers: [
 *     {
 *       provide: APP_INITIALIZER,
 *       useFactory: dectectionApiReady,
 *       deps: [HttpClient],
 *       multi: true,
 *     },
 *  ]
 * ```
 */
export const dectectionApiReady = (httpClient: HttpClient): (() => Observable<[IPersonalApi]>) => {
  return (): Observable<[IPersonalApi]> =>
    combineLatest([
      httpClient.get<IPersonalApi>(`${environment.apiUrl}`),
    ]).pipe(tap(() => console.log(`Initialisation de l'app en %c${window.performance.now() / 1000}s`, 'color: #2780e1')));
};

/**
 * @description Factory qui sert à detecter si les API sont actives
 * @description Initialiser dans AppModule
 * @author Samakunchan
 * @example
 * ```ts
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *      ...ect
 *     provideHttpClient(),
 *     provideAppInitializer(detectionApisReady()),
 *   ]
 * };
 * ```
 */
export function detectionServerReady(): ()=> Observable<[IPersonalApi, IwellKnowKeycloak]> {
  return (): Observable<[IPersonalApi, IwellKnowKeycloak]> => {
    const http: HttpClient = inject(HttpClient);

    console.log('Voici le server url', environment.keycloakServer);
    return combineLatest([
      http.get<IPersonalApi>(`${environment.apiUrl}`).pipe(
        tap(() => console.log(`Initialisation de l'app en %c${window.performance.now() / 1000}s`, 'color: #2780e1')),
        catchError(err => {
          console.error(`L'API ${environment.apiUrl} n'a pas l'air de fonctionner.`)
          return of({
            title: 'Error',
            description: 'Error',
            author: 'Error',
            version: 'Error',
          } as IPersonalApi)
        })
      ),
      http.get<IwellKnowKeycloak>(`${environment.keycloakServer}/realms/ppg-connect/.well-known/openid-configuration`).pipe(
        tap(() => console.log(`Initialisation de l'app en %c${window.performance.now() / 1000}s`, 'color: #2780e1')),
        catchError(err => {
          console.error(`L'url https://secure-connect.devpapangue.com/realms/ppg-connect/.well-known/openid-configuration n'e pas l'air de fonctionner.`)
          return of( {
            issuer: 'Error',
            authorizationEndpoint: 'Error',
            tokenEndpoint: 'Error',
            userinfoEndpoint: 'Error',
            end_sessionEndpoint: 'Error',
          } as unknown as IwellKnowKeycloak)
        })
      ),
    ]);
  };
}
// https://secure-connect.devpapangue.com/realms/ppg-connect/.well-known/openid-configuration
