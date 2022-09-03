import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';

import securityConfig from '../../../config/security-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {
    this.oktaSignin = new OktaSignIn({
      baseUrl: securityConfig.oidc.issuer.split('/oauth2')[0],
      logo: 'assets/logo/germandilio_internal_marketplace.png',
      clientId: securityConfig.oidc.clientId,
      redirectUri: securityConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: securityConfig.oidc.issuer,
        scopes: securityConfig.oidc.scopes
      }
    });
   }

  ngOnInit(): void {
    this.oktaSignin.remove();
    
    this.oktaSignin.renderEl(
      {
        el: '#okta-sign-in-widget'},
        (responce: any) => {
          if (responce.status === 'SUCCESS') {
            this.oktaAuth.signInWithRedirect();
          }
        },
        (error: any) => {
          throw error;
        }
    );
  }

}
