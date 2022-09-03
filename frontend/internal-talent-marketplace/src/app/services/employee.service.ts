import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../common/employee';
import {map } from 'rxjs';
import { __param } from 'tslib';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseURL = environment.itmApiBasePath + environment.employeesApiPostfix;

  constructor(private httpClient: HttpClient) { }

  getEmployees(pageNumber: number, pageSize: number): Observable<EmployeePaginableResponce> {
    const url = `${this.baseURL}?page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<EmployeePaginableResponce>(url);
  }

  getEmployeesByPositionId(pageNumber: number,
                      pageSize: number,
                      positionsIds: number[]): Observable<EmployeePaginableResponce> {
    const url = `${this.baseURL}/search/findByPositionIdIn?id=${positionsIds.join(',')}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<EmployeePaginableResponce>(url);
  }

  searchEmployees(pageNumber: number,
    pageSize: number,
    value: string): Observable<EmployeePaginableResponce> {
  const url = `${this.baseURL}/search/findByFIOContaining?value=${value}&page=${pageNumber}&size=${pageSize}`;

  return this.httpClient.get<EmployeePaginableResponce>(url);
  }

  getEmployeesFilteredAndSearch(pageNumber: number,
                                pageSize: number,
                                value: string,
                                positionsIds: number[]): Observable<EmployeePaginableResponce> {
    
    const url = `${this.baseURL}/search/findByPositionIdInAndFIOContaining?value=${value}&id=${positionsIds.join(',')}&page=${pageNumber}&size=${pageSize}`;

    return this.httpClient.get<EmployeePaginableResponce>(url);
  }

  getEmployeesById(id: number): Observable<Employee> {
  const url = `${this.baseURL}/${id}`;

  return this.httpClient.get<Employee>(url);
  }

  // getEmployeesByPositionId(posId: number[]): Observable<Employee[]> {
  //   const url = `${this.baseURL}/search/findByPositionIdIn?id=${posId.join(',')}`;

  //   return this.httpClient.get<ConvertResponce>(url).pipe(
  //     map(responce => responce._embedded.employees)
  //   );
  // }

  // searchEmployees(value: string): Observable<Employee[]> {
  //   const url = `${this.baseURL}/search/findByFIOContaining?value=${value}`;

  //   return this.httpClient.get<EmployeePaginableResponce>(url).pipe(
  //     map(responce => responce._embedded.employees)
  //   );
  // }
}

export interface EmployeePaginableResponce {
  _embedded: {
    employees: Employee[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number;
  }
}
