import {Model} from "mongoose";

export interface UserTypes {
  username: string;
  password: string;
  token: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserTypes, {}, UserMethods>;

export interface PostTypes {
  user: string;
  title: string;
  description: string;
  image: string | null;
}