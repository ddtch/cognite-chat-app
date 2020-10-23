import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {BehaviorSubject} from 'rxjs';
import {ChatModel} from '../../models/ChatModel';
import {ChatMessageModel} from '../../models/ChatMessageModel';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {
  public selectedChatId = null;
  public chats: BehaviorSubject<ChatModel[]> = new BehaviorSubject<ChatModel[]>([]);
  public messages: BehaviorSubject<ChatMessageModel[]> = new BehaviorSubject<ChatMessageModel[]>(null);

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.getAllChats()
      .subscribe(chats => chats && this.chats.next(chats));
    this.chatService.activeChat$
      .subscribe(data => data && this.messages.next(data.messages));
  }

  public onChatSelected(chatId: number) {
    if (this.selectedChatId === chatId) {
      return;
    }
    this.selectedChatId = chatId;
    this.chatService.getChatMessages(chatId);
  }

  public onMessageSent(message: string) {
    this.chatService.sendMessage(message, this.selectedChatId);
  }

}
