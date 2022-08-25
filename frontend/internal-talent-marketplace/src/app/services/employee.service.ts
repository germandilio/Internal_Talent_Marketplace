import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../common/employee';
import {map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL = 'http://localhost:8080/internal-talent-marketplace/api/employees';

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<ConvertResponce>(this.baseURL).pipe(
      map(responce => responce._embedded.employees)
    )
  }
}

interface ConvertResponce {
  _embedded: {
    employees: Employee[];
  }
}
