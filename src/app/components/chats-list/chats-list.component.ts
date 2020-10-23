import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ChatModel} from '../../models/ChatModel';

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent implements OnInit {

  @Input()
  public readonly chats: ChatModel[];
  @Input()
  public readonly selectedChatId: number;
  @Output()
  public chatSelected: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  public onChatSelected(chatId: number) {
    this.chatSelected.emit(chatId);
  }

}
