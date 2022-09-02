export class User {
  constructor(
    private token_type: string,
    private access_token: string,
    private expiration?: Date
  ) {}

  get token() {
    console.log (this.access_token)
    return this.access_token;
  }
}
