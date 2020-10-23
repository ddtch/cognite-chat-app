import {UserModel} from './UserModel';
import {ChatMessageModel} from './ChatMessageModel';

export interface ChatModel {
  id: number;
  user: UserModel;
  messages: ChatMessageModel[];
}
