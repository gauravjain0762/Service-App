export const SERVICE_BASE_URL = 'https://sky.devicebee.com/ServiceBooking/api';

export const SEEKER_API = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    GUEST_LOGIN: '/guestLogin',
    VERIFY_OTP: '/verifyOTP',
    SEND_OTP: '/sendOTP',
    RESEND_OTP: '/resendOTP',
    FORGOT_PASSWORD: '/forgotPassword',
    RESET_PASSWORD: '/resetPassword',
    GOOGLE_SIGNIN: '/googleSignin',
    APPLE_SIGNIN: '/appleSignin',
    LOGOUT: '/logout',
    DELETE_ACCOUNT: '/deleteAccount',
  },
  PROFILE: {
    PROFILE: '/getProfile',
    UPDATE_PROFILE: '/updateProfile',
    CHANGE_PASSWORD: '/changePassword',
  },
  DASHBOARD: {
    NOTIFICATIONS: 'getNotifications',
    CLEAR_ALL_NOTIFICATIONS: 'clearAllNotifications',
    DASHBOARD: '/getDashboard',
    SUB_CATEGORIES: '/getSubCategories',
    REQUESTS: '/getRequests',
    REQUEST_DETAILS: '/getRequestDetails',
    CREATE_REQUEST: '/createRequest',
    ACCEPT_OFFER: '/acceptOffer',
    JOBS: '/getJobs',
    JOBS_DETAILS: '/getJobDetails',
  },
} as const;

export const PROVIDER_API = {
  AUTH: {
    LOGIN: '/company/login',
    REGISTER: '/company/register',
    GUEST_LOGIN: '/company/guestLogin',
    VERIFY_OTP: '/company/verifyOTP',
    SEND_OTP: '/company/sendOTP',
    RESEND_OTP: '/company/resendOTP',
    FORGOT_PASSWORD: '/company/forgotPassword',
    RESET_PASSWORD: '/company/resetPassword',
    GOOGLE_SIGNIN: '/company/googleSignin',
    APPLE_SIGNIN: '/company/appleSignin',
    LOGOUT: '/company/logout',
    DELETE_ACCOUNT: '/company/deleteAccount',
  },
  DROPDOWN: {
    CATEGORIES: '/company/getCategories',
    SUB_CATEGORIES: '/company/getSubCategories',
  },
  PROFILE: {
    PROFILE: '/company/getProfile',
    UPDATE_PROFILE: '/company/updateProfile',
    CHANGE_PASSWORD: '/company/changePassword',
  },
  DASHBOARD: {
    NOTIFICATIONS: 'getNotifications',
    CLEAR_ALL_NOTIFICATIONS: 'clearAllNotifications',
    DASHBOARD: '/company/getDashboard',
    SUB_CATEGORIES: '/company/getSubCategories',
    REQUESTS: '/company/getRequests',
    REQUEST_DETAILS: '/company/getRequestDetails',
    SEND_OFFER:'/company/sendOffer',
    JOBS: '/company/getJobs',
    JOBS_DETAILS: '/company/getJobDetails',
    PACKAGES:'/company/getPackages',
    BUY_PACKAGE:'/company/buyPackage',
  },
} as const;

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
export const GOOGLE_MAP_API_KEY = 'AIzaSyBTXj_nx06ltbjSW54sGM6GYYfaZPXFtaI'; //'AIzaSyDI54CSbb2x46H2986nVnG15-E0iqgONwc'
export const WEB_CLIENT_ID =
  '594792561785-n9meqmlbipigp53o7hfgm6npa6osao68.apps.googleusercontent.com';

export type HttpMethod = keyof typeof HTTP_METHOD;
export type HttpStatus = (typeof HTTP_STATUS)[keyof typeof HTTP_STATUS];
export type ApiErrorCode = (typeof API_ERROR_CODE)[keyof typeof API_ERROR_CODE];
