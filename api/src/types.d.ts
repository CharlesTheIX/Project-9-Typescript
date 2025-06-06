// KEEP THE TYPE IN THIS FILE IN ALPHABETICAL ORDER!

type ApiResponse = {
  status: number;
  error: boolean;
  message: string;
  data: ApiManyResponseData | any;
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

type ApiManyResponseData = {
  created: string[];
  skipped: string[];
  errors: { id: string; message: string }[];
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

type NotificationData = MongoDocDefaults & {
  readBy: string;
  subject: string;
  participants: string[];
  messages: NotificationMessage[]
  type: "default" | "message" | "award";
};

type NotificationMessage = {
  to: string;
  from: string;
  createdAt: Date,
  content: string;
  state?: "active" | "deleted";
};

type NotificationType = "default" | "message" | "award";

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
