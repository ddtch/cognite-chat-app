import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of, Subject} from 'rxjs';
import {RoomModel} from '../models/RoomModel';
import {UserModel} from '../models/UserModel';
import {MessageModel} from '../models/MessageModel';
import {map} from 'rxjs/operators';

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
  }
];

const mockRooms: RoomModel[] = [
  {
    id: 1,
    title: 'common',
    messages: [
      {
        user: mockUsers[0],
        message: 'hi guys'
      },
      {
        user: mockUsers[1],
        message: 'yo man'
      }
    ],
    users: [...mockUsers, mockAuthUser]
  }
];

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private connectedUserId: number;
  private activeChatRoomId: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private chatRooms: BehaviorSubject<RoomModel[]> = new BehaviorSubject<RoomModel[]>([]);
  private activeRoom: BehaviorSubject<RoomModel> = new BehaviorSubject<RoomModel>(null);
  public chatRooms$ = this.chatRooms.asObservable();
  public activeRoom$ = this.activeRoom.asObservable();

  constructor() {
  }

  public getChatRooms() {
    this.chatRooms.next(mockRooms);
  }

  public connectToRoom(roomId: number) {
    this.activeChatRoomId.next(roomId);
    return this.chatRooms$.pipe(
      map(rooms => rooms.find(room => room.id === roomId))
    ).subscribe(exactRoom => {
      this.activeRoom.next(exactRoom);
    });
  }

  public sendMessage(message: string): Observable<boolean> {
    const newMessage: MessageModel = {
      user: mockAuthUser,
      message,
    };
    const currentRoomId = this.activeChatRoomId.getValue();
    const rooms = this.chatRooms.getValue();
    const activeRoom = rooms.filter(el => el.id === currentRoomId)[0];
    activeRoom.messages = [...activeRoom.messages, newMessage];

    this.activeRoom.next(activeRoom);
    return of(true);
  }

  public createNewChatWithUser(userId: number, title?: string) {
    if (userId === mockAuthUser.id || userId === this.connectedUserId) {
      return;
    }
    this.connectedUserId = userId;

    const newRoomId = Math.random();
    const user = mockUsers.find(u => u.id === userId);
    const newRoom: RoomModel = {
      id: newRoomId,
      title,
      users: [user, mockAuthUser],
      messages: []
    };
    const newRoomsData = [...this.chatRooms.getValue(), newRoom];
    this.chatRooms.next(newRoomsData);
    this.activeChatRoomId.next(newRoomId);
    this.connectToRoom(newRoomId);
  }
}
