import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { StorageCore } from '../../storage/storage.core';
import { Router } from '@angular/router';
import { KeycloakConfig } from '../../utils/config.core';
import { ErrorEnum } from '../../enums/error.enum';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isUserLoaded$: Observable<boolean> = of(false);
  hrefLogin: string = '';
  hrefLogout: string = '';
  constructor(private authenticationService: AuthenticationService, private router: Router, private storage: StorageCore) {
    this.hrefLogin = `${KeycloakConfig.loginKeycloakUrl}`;
    if(this.storage.idToken != ErrorEnum.noIdToken) {
      this.hrefLogout = `${KeycloakConfig.keycloakUrlForLogout(this.storage.idToken)}`;
    }

    this.isUserLoaded$ = this.authenticationService.loaded$;
  }

  /**
   * @author Samakunchan
   * Url de logout via keycloak
   */
  additionnalActionWithLogout(): void {
    if (this.storage.idToken != ErrorEnum.noIdToken) {
      console.log('OKKKKKKK');
      this.storage.deleteTokens();
    }
  }
}
