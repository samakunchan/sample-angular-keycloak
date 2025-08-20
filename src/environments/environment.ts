/**
 * Variables d'environnements pour la partie prod.
 * Lib utiliser : @ngx-env/builder
 * Bien préfixer les variables avec "NG_APP_"
 */
export const environment = {
  title: 'Prod',
  apiUrl: import.meta.env.NG_APP_API_URL,
  keycloakServer: import.meta.env.NG_APP_KEYCLOAK_SERVER,
  keycloakReam: import.meta.env.NG_APP_KEYCLOAK_REALM,
  keycloakClientID: import.meta.env.NG_APP_KEYCLOAK_CLIENT_ID,
  keycloakClientSecret: import.meta.env.NG_APP_KEYCLOAK_CLIENT_SECRET,
  keycloakRedirectURI: import.meta.env.NG_APP_KEYCLOAK_REDIRECT_URI,
  keycloakRedirectURIDocker: import.meta.env.NG_APP_KEYCLOAK_REDIRECT_URI_DOCKER,
  keycloakCodeChallengeMethod: import.meta.env.NG_APP_KEYCLOAK_CODE_CHALLENGE_METHOD,
  keycloakCodeChallenge: import.meta.env.NG_APP_KEYCLOAK_CODE_CHALLENGE,
  keycloakRCodeVerifier: import.meta.env.NG_APP_KEYCLOAK_CODE_VERIFIER,
  keycloakScopes: import.meta.env.NG_APP_KEYCLOAK_SCOPES,
  keycloakState: import.meta.env.NG_APP_KEYCLOAK_STATE,
};
