import {
  ApplicationConfig, importProvidersFrom,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { dectectionAuthenticationToken, dectectionAuthUserConnected, detectionServerReady } from './utils/intializer';
import { JwtModule } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { KeycloakConfig } from './utils/config.core';

/**
 * Change le header si l'url vers le endpoint de keycloak est défini.
 * Afin de récupérer les infos users, une des méthodes de l'AuthenticationService a besoin d'envoyer des url params.
 * @author Samakunchan
 * @param request
 * @param next
 */
export function httpApiInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(request.url);
  request = request.clone({
    setHeaders: {
      'Content-Type': request.url == KeycloakConfig.keycloakUrlForToken ? 'application/x-www-form-urlencoded' : 'application/json',
    },
  });
  return next(request);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([httpApiInterceptor]),
    ),
    provideAppInitializer(detectionServerReady()),
    provideAppInitializer(dectectionAuthUserConnected()),
    // provideAppInitializer(dectectionAuthenticationToken()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: () => '',
          allowedDomains: ['localhost:4200'],
        },
      }),
    )
  ],
};
