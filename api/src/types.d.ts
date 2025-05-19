// KEEP THE TYPE IN THIS FILE IN ALPHABETICAL ORDER!

type ApiResponse = {
  data: any;
  status: number;
  error: boolean;
  message: string;
};

type Country = MongoDocDefaults & {
  names: string[];
  continent: string;
  displayName: string;
  mapRectangle: Rectangle;
  flagRectangle: Rectangle;
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
  username: string;
  fullName: string;
  profileImageURL?: string;
};

type UserRole = "admin" | "editor" | "user" | "guest";
