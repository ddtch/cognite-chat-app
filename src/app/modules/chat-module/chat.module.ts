import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from '../../components/chat/chat.component';
import {ChatUsersListComponent} from '../../components/chat-users-list/chat-users-list.component';
import {ChatMessageFormComponent} from '../../components/chat-message-form/chat-message-form.component';
import {ChatMessageComponent} from '../../components/chat-message/chat-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ChatComponent,
    ChatUsersListComponent,
    ChatMessageFormComponent,
    ChatMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ChatComponent,
    ChatUsersListComponent,
    ChatMessageFormComponent,
    ChatMessageComponent
  ]
})
export class ChatModule { }
