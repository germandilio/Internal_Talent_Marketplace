import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from '../common/employee';

@Injectable({
  providedIn: 'root'
})
export class ConfigurableTeamService implements OnInit {
  private teamEmployees: Employee[] = [];
  totalCount: Subject<number> = new Subject<number>();

  storageAPI: Storage = sessionStorage;

  constructor() {
  }

   ngOnInit() {
    this.getTeamEmployees();
   }

  addToTeam(employeeToAdd: Employee) {
    if (this.teamEmployees.findIndex(empl => empl.firstName == employeeToAdd.firstName && empl.lastName == employeeToAdd.lastName && empl.positionName == employeeToAdd.positionName && empl.email == employeeToAdd.email) != -1) {
      return;
    }

    this.teamEmployees.push(employeeToAdd);
    this.totalCount.next(this.teamEmployees.length);

    // save tem info to storageAPI
    this.storageAPI.setItem('team-items', JSON.stringify(this.teamEmployees));
  }

  getTeamEmployees(): Employee[] {
    let teamStringValue = this.storageAPI.getItem('team-items');
    if(teamStringValue == null) {
      return [];
    }

    let data = JSON.parse(teamStringValue);
    this.teamEmployees = data;
    this.totalCount.next(this.teamEmployees.length);
    return data;
  }
}
