import {MessageModel} from './MessageModel';
import {UserModel} from './UserModel';

export interface RoomModel {
  id: number;
  title?: string;
  messages: MessageModel[];
  users: UserModel[];
}
