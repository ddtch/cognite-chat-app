import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from '../../components/chat/chat.component';
import {ChatMessageFormComponent} from '../../components/chat-message-form/chat-message-form.component';
import {ChatMessageComponent} from '../../components/chat-message/chat-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChatsListComponent} from '../../components/chats-list/chats-list.component';



@NgModule({
  declarations: [
    ChatComponent,
    ChatMessageFormComponent,
    ChatMessageComponent,
    ChatsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ChatComponent,
    ChatMessageFormComponent,
    ChatMessageComponent,
    ChatsListComponent,
  ]
})
export class ChatModule { }
