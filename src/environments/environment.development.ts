/**
 * Variables d'environnements pour la partie dev.
 * Lib utiliser : @ngx-env/builder
 * Bien préfixer les variables avec "NG_APP_"
 */
export const environment = {
  title: 'Dev',
  keycloakServer: import.meta.env.NG_APP_KEYCLOAK_SERVER,
  keycloakReam: import.meta.env.NG_APP_KEYCLOAK_REALM,
  keycloakClientID: import.meta.env.NG_APP_KEYCLOAK_CLIENT_ID,
  keycloakRedirectURI: import.meta.env.NG_APP_KEYCLOAK_REDIRECT_URI,
  keycloakRedirectURIDocker: import.meta.env.NG_APP_KEYCLOAK_REDIRECT_URI_DOCKER,
};
