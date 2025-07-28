export const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    // Public authentication routes
    // LOGIN: '/auth/login',
  },
} as const;

export const API_ERROR_CODE = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
} as const;

// API request timeout settings
export const API_TIMEOUT = {
  DEFAULT: 30000, // 30 seconds
  UPLOAD: 120000, // 2 minutes for uploads
  LONG_OPERATION: 60000, // 1 minute for long operations
} as const;

export const API_CACHE = {
  NO_CACHE: 'no-cache',
  SHORT: 60, // 1 minute in seconds
  MEDIUM: 300, // 5 minutes in seconds
  LONG: 3600, // 1 hour in seconds
  VERY_LONG: 86400, // 1 day in seconds
} as const;

// Rate limiting settings
export const API_RATE_LIMIT = {
  MAX_REQUESTS_PER_MINUTE: 60,
  RETRY_AFTER: 1000, // 1 second in milliseconds
  MAX_RETRIES: 3,
} as const;

export const ITEMS_PER_PAGE = 10;
export const GOOGLE_MAP_API_KEY =  'AIzaSyBTXj_nx06ltbjSW54sGM6GYYfaZPXFtaI'//'AIzaSyDI54CSbb2x46H2986nVnG15-E0iqgONwc'
export const WEB_CLIENT_ID = '208244015872-j5mi0q8lotdjceab1ih8lgub6e6b9703.apps.googleusercontent.com'
export type HttpMethod = keyof typeof HTTP_METHOD;
export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
export type ApiErrorCode = (typeof API_ERROR_CODE)[keyof typeof API_ERROR_CODE];
