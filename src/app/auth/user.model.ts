export class User {
  constructor(
    private access_token: string,
    private token_type: string,
    private expiration: Date
  ) {}

  get token() {
    if (!this.expiration || new Date() > this.expiration) {
      return null;
    }
    return this.access_token;
  }
}
