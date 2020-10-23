import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MessageModel} from '../../models/MessageModel';
import {UserModel} from '../../models/UserModel';

@Component({
  selector: 'app-chat-message-form',
  templateUrl: './chat-message-form.component.html',
  styleUrls: ['./chat-message-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageFormComponent implements OnInit {
  public message: string;
  @Output()
  public messageSent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public sendMessageToChat() {
    if (!this.message) {
      return;
    }

    this.messageSent.emit(this.message);
    this.message = '';
  }

}
