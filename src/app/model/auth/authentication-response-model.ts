export class AuthenticationResponseModel {
  constructor(
    public jwtToken : string,
    public expiresAt : string,
  public username : string) {}
}
