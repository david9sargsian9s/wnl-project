import { IUserDocument } from "../model/userModel";
import { IProduct } from "../model/EventModel";

export interface IJwtPayload {
  id: string;
  role: 'user' | 'moderator' | 'admin';
}

declare global {
  namespace Express {
    interface User extends IUserDocument {
      id: string;
      role: 'user' | 'moderator' | 'admin';
    }

    interface Request {
      user?: User;
      jwtUser?: IJwtPayload;
      product?: IProduct & { id : string };
    }
  }
}