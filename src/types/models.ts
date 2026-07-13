import { UserModel } from "../model/userModel";
import { EventModel } from "../model/EventModel";
import { tokenModel } from "../model/tokenModel";

export interface IModels {
    users: typeof UserModel;
    products: typeof EventModel;
    token: typeof tokenModel;
}