export enum StatusCodesList {
  Success = 200, // OK
  Created = 201, // Created
  NoContent = 204, // No Content
  BadRequest = 400, // Bad Request
  Unauthorized = 401, // Unauthorized
  Forbidden = 403, // Forbidden
  NotFound = 404, // Not Found
  MethodNotAllowed = 405, // Method Not Allowed
  Conflict = 409, // Conflict
  UnprocessableEntity = 422, // Unprocessable Entity
  InternalServerError = 500, // Internal Server Error
  NotImplemented = 501, // Not Implemented
  ServiceUnavailable = 503, // Service Unavailable
  GatewayTimeout = 504, // Gateway Timeout
}
