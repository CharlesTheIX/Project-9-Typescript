type APIResponse = {
  data: any;
  status: number;
  error: boolean;
  message: string;
};

type Country = {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  names: string[];
  continent: string;
  displayName: string;
  mapRectangle: Rectangle;
  flagRectangle: Rectangle;
};

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};