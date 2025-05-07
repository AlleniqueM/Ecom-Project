import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = [];

  constructor(private userService: UserService) {}
  ngOnInit(): void {
      this.userService.getUsers().subscribe( users => {
        this.users = users;
      });
  }


}
