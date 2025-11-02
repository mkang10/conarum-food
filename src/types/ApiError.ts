export class ApiError extends Error {
  status?: number;
  endpoint: string;
  details?: string;

  constructor(endpoint: string, message: string, status?: number, details?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.endpoint = endpoint;
    this.details = details;
  }
}