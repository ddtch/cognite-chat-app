import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {MessageModel} from '../../models/MessageModel';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent implements OnInit {
  @Input()
  public readonly messages: MessageModel[];
  @Input()
  public activeUserId: number;

  constructor() { }

  ngOnInit(): void {
  }

}
