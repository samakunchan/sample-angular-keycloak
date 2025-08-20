import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { StorageCore } from '../../storage/storage.core';
import { importProvidersFrom } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let storageDeleteTokenSpy: jasmine.SpyObj<StorageCore>;
  let authenticationSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async (): Promise<void> => {
    storageDeleteTokenSpy = jasmine.createSpyObj<StorageCore>('StorageCore', ['deleteTokens'], ['idToken']);
    storageDeleteTokenSpy.idToken = 'not null to trigger true some condition';
    storageDeleteTokenSpy.deleteTokens.and.callThrough();

    authenticationSpy = jasmine.createSpyObj<AuthenticationService>('AuthenticationService', [], {
      loaded$: of(true)
    });

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => '',
            allowedDomains: ['localhost:4200'],
          },
        }),
      ],
      providers: [
        provideHttpClientTesting(),
        { provide: AuthenticationService, useValue: authenticationSpy },

        { provide: StorageCore, useValue: storageDeleteTokenSpy },

        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
