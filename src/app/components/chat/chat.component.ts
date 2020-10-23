import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {BehaviorSubject} from 'rxjs';
import {UserModel} from '../../models/UserModel';
import {MessageModel} from '../../models/MessageModel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit{
  public activeChatRoomId = 1;
  public users: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>(null);
  public messages: BehaviorSubject<MessageModel[]> = new BehaviorSubject<MessageModel[]>(null);

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getChatRooms();

    this.chatService.connectToRoom(this.activeChatRoomId);

    this.chatService.activeRoom$.subscribe(data => {
      console.log(data);
      this.users.next(data.users);
      this.messages.next(data.messages);
    });
  }

  public onUserSelected(userId: number) {
    this.chatService.createNewChatWithUser(userId);
  }

  public onMessageSent(message: string) {
    this.chatService.sendMessage(message);
  }

}
