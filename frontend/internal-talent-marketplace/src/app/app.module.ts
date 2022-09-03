import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PositionChipsComponent } from './components/position-chips/position-chips.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchEmployeesComponent } from './components/search-employees/search-employees.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CongigurableTeamComponent } from './components/congigurable-team/congigurable-team.component';
import { CoonfigurableTeamDetailComponent } from './components/coonfigurable-team-detail/coonfigurable-team-detail.component';
import { LoginComponent } from './components/login/login/login.component';
import { PositionsService } from './services/positions.service';

import { LoginStatusComponent } from './components/login/login-status/login-status.component';

import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import securityConfig from './config/security-config';
import { Router } from '@angular/router';

const oktaConfig =  securityConfig.oidc;
// const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    EmployeesListComponent,
    PositionChipsComponent,
    SearchEmployeesComponent,
    EmployeeDetailComponent,
    PageNotFoundComponent,
    CongigurableTeamComponent,
    CoonfigurableTeamDetailComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    NgbModule,
    OktaAuthModule
  ],
  providers: [EmployeeService, PositionsService, {
    provide: OKTA_CONFIG,
    useFactory: () => {
      const oktaAuth = new OktaAuth(oktaConfig);
      return {
        oktaAuth,
        onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
          const router = injector.get(Router);
          // Redirect the user to your custom login page
          router.navigate(['/login']);
        }
      }
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
