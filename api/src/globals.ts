export const status = {
  // 2**
  OK: 200,
  DB_UPDATED: 201,
  NO_CONTENT: 204,
  // 4**
  BAD: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  // 5**
  SERVER_ERROR: 500,
};

export const response_OK: APIResponse = {
  data: null,
  error: false,
  status: status.OK,
  message: 'Success.',
};
export const response_DB_UPDATED: APIResponse = {
  data: null,
  error: false,
  message: 'DB Updated.',
  status: status.DB_UPDATED,
};
export const response_NO_CONTENT: APIResponse = {
  data: null,
  error: false,
  message: 'No Content.',
  status: status.NO_CONTENT,
};

export const response_BAD: APIResponse = {
  data: null,
  error: true,
  status: status.BAD,
  message: 'Bad Request.',
};
export const response_FORBIDDEN: APIResponse = {
  data: null,
  error: true,
  message: 'Forbidden.',
  status: status.FORBIDDEN,
};
export const response_NOT_FOUND: APIResponse = {
  data: null,
  error: true,
  message: 'Not Found.',
  status: status.NOT_FOUND,
};
export const response_CONFLICT: APIResponse = {
  data: null,
  error: true,
  message: 'Conflict.',
  status: status.CONFLICT,
};

export const response_SERVER_ERROR: APIResponse = {
  data: null,
  error: true,
  message: 'Server Error.',
  status: status.SERVER_ERROR,
};
