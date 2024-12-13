export class RedirectError extends Error {
  redirectPath: string;

  constructor(redirectPath: string) {
    super("Redirect required");
    this.redirectPath = redirectPath;

    Object.setPrototypeOf(this, RedirectError.prototype);
  }
}
