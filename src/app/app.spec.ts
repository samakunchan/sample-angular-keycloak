import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthenticationService } from './services/authentication.service';
import { StorageCore } from './storage/storage.core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('App', () => {
  let storageSpy: jasmine.SpyObj<StorageCore>;
  let authenticationSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    storageSpy = jasmine.createSpyObj<StorageCore>('StorageCore', ['deleteTokens'], ['idToken']);
    storageSpy.idToken = 'not null to trigger true some condition';
    storageSpy.deleteTokens.and.callThrough();

    authenticationSpy = jasmine.createSpyObj<AuthenticationService>('AuthenticationService', [], {
      loaded$: of(false)
    });

    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClientTesting(),
        { provide: AuthenticationService, useValue: authenticationSpy },

        { provide: StorageCore, useValue: storageSpy },

        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, sample-angular-keycloak');
  });
});
