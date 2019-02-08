import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../auth/user';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  users: User[];
  form: any = {};
  user: User;
  checkedUser: any = [];
  state: boolean = false;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  onChange(user, isChecked: boolean) {
    console.log(this.checkedUser);
    console.log(this.checkedUser.indexOf(user));
    if(isChecked && this.checkedUser.indexOf(user) == -1) {
      this.checkedUser.push(user);
    } else {
      let index = this.checkedUser.indexOf(user);
      this.checkedUser.splice(index,1);
    }
  }

  ttt(state: boolean) {
    this.state = state;
    if(this.state || null) {
      this.checkedUser = [];
      for (let i of this.users) {this.checkedUser.push(i)}
    }
    else {
      this.checkedUser = [];
    }
  }

  delete() {
    this.userService.deleteUsers(this.checkedUser).subscribe( () => {this.getAllUsers()});
    for (let i of this.checkedUser) {
      if (i.username === this.tokenStorage.getUser().username) {
        console.log("ok");
        this.tokenStorage.signOut();
        this.router.navigate(['/auth/login']);
        return;
      }
    }
    this.checkedUser = [];
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe( data => this.users = data)
  }
}
