import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from '../../models/UserModel';

@Component({
  selector: 'app-chat-users-list',
  templateUrl: './chat-users-list.component.html',
  styleUrls: ['./chat-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatUsersListComponent implements OnInit {
  @Input()
  public readonly users: UserModel[];
  @Output()
  public userClicked: EventEmitter<number> = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  public onUserClicked(userId: number) {
    this.userClicked.emit(userId);
  }

}
