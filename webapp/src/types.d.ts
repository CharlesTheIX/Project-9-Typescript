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
type ApiParamOptions = {
  and?: string;
  limit?: number;
  sort?: string[];
  search?: string[];
  andValue?: string;
  project?: string[];
  searchValue?: string;
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

/* F */
type FormError = {
  error: boolean;
  message: string;
};
type FormPreferences = {
  hide?: string[];
  searchValue?: string;
  postsPerPage?: number;
};

/* M */
type MongoDocDefaults = {
  __v?: any;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/* N */
type NavigationItem = {
  href: string;
  label: string;
  icon?: string;
};
type NotificationData = MongoDocDefaults & {
  readBy: string;
  subject: string;
  type: NotificationType;
  participants: string[];
  messages: NotificationMessage[];
};
type NotificationMessage = {
  to: string;
  from: string;
  createdAt: Date;
  content: string;
  state?: "active" | "deleted";
};
type NotificationType = "default" | "message" | "award" | "invitation";

/* O */
type Option = {
  label: string;
  value: string | number;
};

/* R */
type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/* R */
type Tab = {
  title: string;
  content: React.ReactElement;
};
type TableHeader = {
  value: string;
  label: string;
  hidden?: boolean;
  canSort?: boolean;
  canCopy?: boolean;
  roles?: UserRole[];
  searchable?: boolean;
  sortState?: SortState;
  dataType?: "edit" | "impersonate" | "pin";
};
type TableSortState = "asc" | "desc" | "shuffled";

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
  status: UserContactStatus;
};
type UserContactStatus = "active" | "pending" | "blocked" | "none";
type UserPrivacyType = "public" | "private" | "contacts_only";
type UserRole = "admin" | "editor" | "user" | "guest" | "test";
