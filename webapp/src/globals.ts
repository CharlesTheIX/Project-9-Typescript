/*
  This philosophy behind this file is:
  Contain miscellaneous consts that are used within the site
  so that when items need to be edited they can easily be found
  and edited in one place.

  ** Constants should be group together logically **
*/

// API Responses
export const status = {
  OK: 200,
  DB_UPDATED: 201,
  NO_CONTENT: 204,
  BAD: 400,
  UNAUTHORISED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

const defaultError = { data: null, error: true };
const defaultSuccess = { data: null, error: false };

export const response_OK: ApiResponse = {
  ...defaultSuccess,
  status: status.OK,
  message: "Success.",
};
export const response_DB_UPDATED: ApiResponse = {
  ...defaultSuccess,
  message: "DB Updated.",
  status: status.DB_UPDATED,
};
export const response_NO_CONTENT: ApiResponse = {
  ...defaultSuccess,
  message: "No Content.",
  status: status.NO_CONTENT,
};

export const response_BAD: ApiResponse = {
  ...defaultError,
  status: status.BAD,
  message: "Bad Request.",
};
export const response_UNAUTHORISED: ApiResponse = {
  ...defaultError,
  message: "Unauthorised.",
  status: status.UNAUTHORISED,
};
export const response_FORBIDDEN: ApiResponse = {
  ...defaultError,
  message: "Forbidden.",
  status: status.FORBIDDEN,
};
export const response_NOT_FOUND: ApiResponse = {
  ...defaultError,
  message: "Not Found.",
  status: status.NOT_FOUND,
};
export const response_CONFLICT: ApiResponse = {
  ...defaultError,
  message: "Conflict.",
  status: status.CONFLICT,
};

export const response_SERVER_ERROR: ApiResponse = {
  ...defaultError,
  message: "Server Error.",
  status: status.SERVER_ERROR,
};

// API
export const defaultInternalHeader = {
  "Content-Type": "application/json",
};

// Continents
export const continentOptions: Option[] = [
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Africa", label: "Africa" },
  { value: "Oceania", label: "Oceania" },
  { value: "North America", label: "North America" },
  { value: "South America", label: "South America" },
];
export const continents: Continent[] = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"];

// Users
export const userProfilePrivacyOptions: Option[] = [
  { value: "private", label: "Private" },
  { value: "public", label: "Public" },
  { value: "contacts_only", label: "Contacts only" },
];
export const userProfilePrivacyTypes: UserPrivacyType[] = ["public", "private", "contacts_only"];
export const userRoleOptions: Option[] = [
  { value: "user", label: "User" },
  { value: "guest", label: "Guest" },
  { value: "editor", label: "Editor" },
  { value: "test", label: "Test" },
  { value: "admin", label: "Admin" },
];
export const userRoles: UserRole[] = ["admin", "editor", "guest", "test", "user"];

// Nulls
export const nullOption: Option = {
  value: "",
  label: "",
};
export const nullRectangle: Rectangle = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
export const nullCountry: Country = {
  _id: undefined,
  displayName: "",
  names: [],
  continent: "Europe",
  description: undefined,
  capitalCity: undefined,
  languages: undefined,
  population: undefined,
  imageUrl: undefined,
  mapRectangle: nullRectangle,
  flagRectangle: nullRectangle,
  updatedAt: undefined,
  createdAt: undefined,
  __v: undefined,
};
