export class AuthUser {
  constructor(
    public siren: string,
    public emailVerified: boolean,
    public name: string,
    public preferredUsername: string,
    public givenName: string,
    public familyName: string,
    public email: string,
    public role: string,
  ) {}
}
