/*
  KEEP THE TYPE IN THIS FILE IN ALPHABETICAL ORDER!
*/

type ApiResponse = {
  data: any;
  status: number;
  error: boolean;
  message: string;
};

type Continent = "Europe" | "Asia" | "Africa" | "Noth America" | "South America" | "Oceania";

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

type FormError = {
  error: boolean;
  message: string;
};

type FormPreferences = {
  hide?: string[];
  searchValue?: string;
  postsPerPage?: number;
};

type MongoDocDefaults = {
  __v?: any;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type NavigationItem = {
  href: string;
  label: string;
  icon?: string;
};

type Option = {
  label: string;
  value: string | number;
};

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

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
  dataType?: "edit" | "impersonate";
};

type TableSortState = "asc" | "desc" | "shuffled";

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
