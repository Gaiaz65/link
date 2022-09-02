export class User {
  constructor(
    private token_type: string,
    private access_token: string,
  ) {}

  get token() {
    return this.access_token;
  }
}
