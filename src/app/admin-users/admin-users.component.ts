import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin/admin.service';
import { BackButtonComponent } from '../components/back-button/back-button.component';

interface User {
  user_id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: boolean;
  created_at: string;
}

@Component({
  selector: 'app-admin-users',
  imports: [BackButtonComponent],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})

export class AdminUsersComponent {
  users: any[] = [];

  constructor(private adminService: AdminService) {
    this.adminService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  updateRole(userId: number, currentRole: boolean): void {
    this.adminService.updateUserRole(userId, !currentRole).subscribe(() => {
      this.users = this.users.map(user =>
        user.user_id === userId ? {...user, role: !user.role} : user
      );
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Delete this user?')) {
      this.adminService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.user_id !== userId);
      });
    }
  }
}
