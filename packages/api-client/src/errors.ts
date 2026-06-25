export class ApiClientError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code = "API_CLIENT_ERROR",
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}
