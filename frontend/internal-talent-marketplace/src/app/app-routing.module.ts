import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { CoonfigurableTeamDetailComponent } from './components/coonfigurable-team-detail/coonfigurable-team-detail.component';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { LoginComponent } from './components/login/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},

  {path: 'search/position/:id/:value', component: EmployeesListComponent, canActivate: [OktaAuthGuard]},
  {path: 'position/:id', component: EmployeesListComponent, canActivate: [OktaAuthGuard]},
  {path: 'position', component: EmployeesListComponent, canActivate: [OktaAuthGuard]},
  {path: 'search/:value', component: EmployeesListComponent, canActivate: [OktaAuthGuard]},
  {path: 'employees/team-details', component: CoonfigurableTeamDetailComponent, canActivate: [OktaAuthGuard]},
  {path: 'employees/:id', component: EmployeeDetailComponent, canActivate: [OktaAuthGuard]},
  {path: 'employees', component: EmployeesListComponent, canActivate: [OktaAuthGuard]},
  {path: '', redirectTo: '/employees', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
