import {UserModel} from './UserModel';

export interface MessageModel {
  user: UserModel;
  message: string;
}
