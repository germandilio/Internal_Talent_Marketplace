import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../common/employee';
import {map } from 'rxjs';
import { __param } from 'tslib';

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

  getEmployeesByPositionId(posId: number[]): Observable<Employee[]> {
    const url = `${this.baseURL}/search/findByPositionIdIn?id=${posId.join(',')}`;

    return this.httpClient.get<ConvertResponce>(url).pipe(
      map(responce => responce._embedded.employees)
    );
  }

  searchEmployees(value: string): Observable<Employee[]> {
    const url = `${this.baseURL}/search/findByFIOContaining?value=${value}`;

    return this.httpClient.get<ConvertResponce>(url).pipe(
      map(responce => responce._embedded.employees)
    );
  }

  getEmployeesById(id: number): Observable<Employee> {
    const url = `${this.baseURL}/${id}`;

    return this.httpClient.get<Employee>(url);
  }
}

interface ConvertResponce {
  _embedded: {
    employees: Employee[];
  }
}
