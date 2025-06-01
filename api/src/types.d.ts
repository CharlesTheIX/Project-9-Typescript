// KEEP THE TYPE IN THIS FILE IN ALPHABETICAL ORDER!

type ApiResponse = {
  status: number;
  error: boolean;
  message: string;
  data: CreateManyResponse | any;
};

type Continent = "Europe" | "Asia" | "Africa" | "North America" | "South America" | "Oceania";

type Country = MongoDocDefaults & {
  names: string[];
  continent: string;
  imageUrl?: string;
  population?: number;
  displayName: string;
  description?: string;
  capitalCity?: string;
  languages?: string[];
  mapRectangle: Rectangle;
  flagRectangle: Rectangle;
};

type CreateManyResponse = {
  created: string[];
  skipped: string[];
  errors: { displayName: string; message: string }[];
};

type GetManyResponse = {
  items: any[],
  count: number,
};

type MongoDocDefaults = {
  __v?: any;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type User = MongoDocDefaults & {
  email: string;
  role: UserRole;
  clerkId: string;
  // surname: string;
  username: string;
  // firstName: string;
  profileImageURL?: string;
};

type UserRole = "admin" | "editor" | "user" | "guest" | "test";
