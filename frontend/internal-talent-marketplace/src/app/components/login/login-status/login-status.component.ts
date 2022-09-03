import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userName: string = '';

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {
    this.oktaAuthService.authState$.subscribe(
      (result) => {
        this.isAuthenticated = result.isAuthenticated as boolean;
        this.getUserDetails();
      }
    );
  }

  private getUserDetails() {
    if (!this.isAuthenticated) {
      return;
    }

    this.oktaAuth.getUser().then(
      res => {
        this.userName = res.name as string;
      }
    )
  }

  logout() {
    this.oktaAuth.signOut();
  }

}
