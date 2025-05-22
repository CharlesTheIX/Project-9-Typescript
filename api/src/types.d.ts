// KEEP THE TYPE IN THIS FILE IN ALPHABETICAL ORDER!

type ApiResponse = {
  data: any;
  status: number;
  error: boolean;
  message: string;
};

type Continent = "Europe" | "Asia" | "Africa" | "North America" | "South America" | "Oceania";

type Country = MongoDocDefaults & {
  names: string[];
  continent: string;
  imageUrl?: string;
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
  surname: string;
  username: string;
  firstName: string;
  profileImageURL?: string;
};

type UserRole = "admin" | "editor" | "user" | "guest";
