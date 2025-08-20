import { environment } from '../../environments/environment';


export class KeycloakConfig {

  static reponseType: string = 'code';

  /**
   * Endpoint Keycloak se connecter et récupérer le code dans les params url
   * @link  https://secure-connect.devpapangue.com/realms/.../protocol/openid-connect/auth?response_type=code&client_id=...
   */
  static loginKeycloakUrl: string =
    `https://${environment.keycloakServer}/realms/` +
    `${environment.keycloakReam}/protocol/openid-connect/auth?response_type=${KeycloakConfig.reponseType}` +
    `&client_id=${environment.keycloakClientID}&redirect_uri=${environment.keycloakRedirectURI}&code_challenge=` +
    `${environment.keycloakCodeChallenge}&code_challenge_method=${environment.keycloakCodeChallengeMethod}` +
    `&scope=${environment.keycloakScopes}&state=${environment.keycloakState}`;

  /**
   * Endpoint Keycloak pour récupérer les tokens de connexions
   * @link https://secure-connect.devpapangue.com/realms/ppg-connect/protocol/openid-connect/token
   */
  static keycloakUrlForToken: string =
    `https://${environment.keycloakServer}/realms/` + `${environment.keycloakReam}/protocol/openid-connect/token`;

  static keycloakAllInfosUrl: string =
    `https://${environment.keycloakServer}/realms/` + `${environment.keycloakReam}/.well-known/openid-configuration`;

  /**
   * Endpoint Keycloak pour se déconnecter
   * @link https://secure-connect.devpapangue.com/realms/ppg-connect/protocol/openid-connect/logout
   */
  static keycloakUrlForLogout(idToken: string): string {
    return (
      `https://${environment.keycloakServer}/realms/${environment.keycloakReam}` +
      `/protocol/openid-connect/logout?post_logout_redirect_uri=${environment.keycloakRedirectURI}&id_token_hint=${idToken}`
    );
  }
}

