// KEEP THE TYPE IN THIS FILE IN ALPHABETICAL ORDER!

/* A */
type ApiResponse = {
  status: number;
  error: boolean;
  message: string;
  data: ApiResponseDataType;
};
type ApiManyResponseData = {
  created: string[];
  skipped: string[];
  errors: { id: string; message: string }[];
};
type ApiMultiResponseData = {
  items: any[];
  count: number;
};
type ApiResponseDataType = null | any | any[] | ApiManyResponseData | ApiMultiResponseData;

/* C */
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

/* G */
type GameData = MongoDocDefaults & {
  score: number;
  userId: string;
  gameType: GameDataType;
};
type GameDataType = "countries_memory";

/* M */
type MongoDocDefaults = {
  __v?: any;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/* N */
type NotificationData = MongoDocDefaults & {
  readBy: string;
  subject: string;
  participants: string[];
  messages: NotificationMessage[];
  type: "default" | "message" | "award" | "invitation";
};
type NotificationMessage = {
  to: string;
  from: string;
  createdAt: Date;
  content: string;
  state?: "active" | "deleted";
};
type NotificationType = "default" | "message" | "award";

/* R */
type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/* U */
type User = MongoDocDefaults & {
  email: string;
  role: UserRole;
  clerkId: string;
  username: string;
  profileImageUrl?: string;
  contacts?: UserContactData[];
  profilePrivacy?: UserPrivacyType;
};
type UserContactData = {
  userId: string;
  status: "active" | "pending" | "blocked" | "none";
};
type UserPrivacyType = "public" | "private" | "contacts_only";
type UserRole = "admin" | "editor" | "user" | "guest" | "test";
