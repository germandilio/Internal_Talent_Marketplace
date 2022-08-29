import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'position/:id', component: EmployeesListComponent},
  {path: 'position', component: EmployeesListComponent},
  {path: 'search/:value', component: EmployeesListComponent},
  {path: 'employees/:id', component: EmployeeDetailComponent},
  {path: 'employees', component: EmployeesListComponent},
  {path: '', redirectTo: '/employees', pathMatch: 'full'},
  {path: '**', redirectTo: '/employees', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
