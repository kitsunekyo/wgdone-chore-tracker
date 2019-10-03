import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(public auth: AuthService) {}

  ngOnInit() {}

  login() {
    this.auth.googleSignin();
  }
  logout() {
    this.auth.signOut();
  }
}
