import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {UserModel} from '../models/UserModel';
import {map} from 'rxjs/operators';
import {ChatModel} from '../models/ChatModel';
import {ChatMessageModel} from '../models/ChatMessageModel';

const mockAuthUser: UserModel = {
  id: 1,
  name: 'Dave'
};

const mockUsers: UserModel[] = [
  {
    id: 2,
    name: 'Matt'
  },
  {
    id: 3,
    name: 'John'
  },
  {
    id: 4,
    name: 'Adam'
  }
];

const mockChats: ChatModel[] = [
  {
    id: 1,
    messages: [
      {
        userId: mockUsers[0].id,
        message: 'Hi Dave'
      },
      {
        userId: mockAuthUser.id,
        message: 'Hi man'
      }
    ],
    user: mockUsers[0]
  },
  {
    id: 2,
    messages: [
      {
        userId: mockUsers[1].id,
        message: 'Hi there'
      },
      {
        userId: mockAuthUser.id,
        message: 'Yo'
      }
    ],
    user: mockUsers[1]
  }
];

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chats: BehaviorSubject<ChatModel[]> = new BehaviorSubject<ChatModel[]>([]);
  private activeChat: BehaviorSubject<ChatModel> = new BehaviorSubject<ChatModel>(null);
  public chats$ = this.chats.asObservable();
  public activeChat$ = this.activeChat.asObservable();

  constructor() {
  }

  public getAllChats(): Observable<ChatModel[]> {
    this.chats.next(mockChats);
    return of(mockChats);
  }

  public getChatMessages(chatId: number) {
    return this.chats$.pipe(
      map(chats => chats.find(chat => chat.id === chatId))
    ).subscribe(chat => {
      this.activeChat.next(chat);
    });
  }

  public sendMessage(message: string, chatId: number): Observable<boolean> {
    const newMessage: ChatMessageModel = {
      userId: mockAuthUser.id,
      message,
    };

    const chats = this.chats.getValue();
    const activeChat = chats.filter(el => el.id === chatId)[0];
    activeChat.messages = [...activeChat.messages, newMessage];

    this.activeChat.next(activeChat);
    return of(true);
  }
}
