import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/common/employee';
import { ConfigurableTeamService } from 'src/app/services/configurable-team.service';
import { EmployeePaginableResponce, EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list-grid.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  employees: Employee[] = [];

  currentPositionsFilter: number[] = [];
  searchMode: boolean = false;

  previousPositionsFilter: number[] = [];
  prevSearchValue: string = '';

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private employeeService: EmployeeService,
              private configurableTeamService: ConfigurableTeamService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listEmployees();
    });
  }

  listEmployees() {
    if (!this.arraysEqual(this.previousPositionsFilter, this.currentPositionsFilter)) {
      this.pageNumber = 1;
    }
    this.previousPositionsFilter = this.currentPositionsFilter;

    this.defineSearchMode();
    this.defineCurrentPositionId();

    if (this.searchMode && this.currentPositionsFilter.length > 0) {
      this.searchAndFilterEmployees();
    } else if (this.searchMode) {
      this.searchEmployees();
    } else if (this.currentPositionsFilter.length > 0){
      this.initFilteredEmployeeList();
    } else {
      this.initEmployeeList();
    }
  }

  initEmployeeList() {
    // get all emoloyees
    this.employeeService.getEmployees(this.pageNumber - 1,
                                      this.pageSize)
                                      .subscribe(this.convertResponce())
  }

  initFilteredEmployeeList() {
    
      
    // get employees by category
    this.employeeService.getEmployeesByPositionId(this.pageNumber - 1,
                                                  this.pageSize,
                                                  this.currentPositionsFilter)
                                                  .subscribe(this.convertResponce())
  }

  searchEmployees() {
    var value = this.extractSearchValue();
  
    this.employeeService.searchEmployees(this.pageNumber - 1,
                                         this.pageSize,
                                         value)
                                         .subscribe(this.convertResponce())
  }

  searchAndFilterEmployees() {
    var value = this.extractSearchValue();

    this.extractId();

    this.employeeService.getEmployeesFilteredAndSearch(this.pageNumber - 1,
                                                      this.pageSize,
                                                      value,
                                                      this.currentPositionsFilter)
                                                      .subscribe(this.convertResponce())
  }

  updatePageSize(target: EventTarget | null) {
    if (target == null) {
      return;
    }
    const newPageSize = +(target as HTMLButtonElement).value;
    this.pageSize = newPageSize;
    this.pageNumber = 1;
    this.listEmployees();
  }

  addToTeam(employeeToAdd: Employee) {
    this.configurableTeamService.addToTeam(employeeToAdd);
  }

  private extractSearchValue(): string {
    const paramName: string = 'value';
    if (!this.route.snapshot.paramMap.has(paramName)) {
      return '';
    }

    this.searchMode = true;
    var value = this.route.snapshot.paramMap.get(paramName);
    if(value == null) {
      value = '';
    }

    if (this.prevSearchValue != value) {
      this.pageNumber = 1;
    }
    this.prevSearchValue = value;
    return value;
  }

  private extractId() {
    const paramName: string = 'id';
    if (!this.route.snapshot.paramMap.has(paramName)) {
      return;
    }
      
    var paramValue = this.route.snapshot.paramMap.get(paramName);
    if (paramValue != null) {
      this.currentPositionsFilter = paramValue.split(',').map(item => parseInt(item));
    }
  }

  private defineSearchMode(): boolean {
    const paramName: string = 'value';
    this.searchMode = this.route.snapshot.paramMap.has(paramName);
    return this.searchMode;
  }

  private defineCurrentPositionId(): number[] {
    const paramName: string = 'id';
    if (!this.route.snapshot.paramMap.has(paramName)) {
      return this.currentPositionsFilter = [];
    }
      
    var paramValue = this.route.snapshot.paramMap.get(paramName);
    if (paramValue == null) {
      return this.currentPositionsFilter = [];
    }

    return this.currentPositionsFilter = paramValue.split(',').map(item => parseInt(item));
  }

  private convertResponce() {
    return (data: EmployeePaginableResponce) => {
      this.employees = data._embedded.employees;
      this.pageSize = data.page.size;
      this.pageNumber = data.page.number + 1;
      this.totalElements = data.page.totalElements;
    }
  }

  private arraysEqual(a: number[], b: number[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}
