import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/common/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list-grid.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  prevURL: string = '';
  employees: Employee[] = [];

  currentPositionId: number[] = [];
  searchMode: boolean = false;

  constructor(private employeeService: EmployeeService, 
              private route:ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.prevURL = this.router.url;
      console.log(this.prevURL);

      if (this.defineSearchMode()) {
        this.searchEmployees();
      } else if (this.defineCurrentPositionId().length > 0){
        this.initFilteredEmployeeList();
      } else {
        this.initEmployeeList();
      }
    });
  }

  initEmployeeList() {
    // get all emoloyees
    this.employeeService.getEmployees().subscribe(
      data => {
        this.employees = data;
      }
    )
  }

  initFilteredEmployeeList() {
    const paramName: string = 'id';
    if (!this.route.snapshot.paramMap.has(paramName)) {
      return;
    }
      
    var paramValue = this.route.snapshot.paramMap.get(paramName);
    if (paramValue != null) {
      this.currentPositionId = paramValue.split(',').map(item => parseInt(item));
    }
      
    // get employees by category
    this.employeeService.getEmployeesByPositionId(this.currentPositionId).subscribe(
      data => {
        this.employees = data;
      }
    )
  }

  searchEmployees() {
    const paramName: string = 'value';
    if (!this.route.snapshot.paramMap.has(paramName)) {
      return;
    }

    var value = this.route.snapshot.paramMap.get(paramName);
    if(value == null) {
      value = '';
    }

    this.searchMode = true;
    this.employeeService.searchEmployees(value).subscribe(
      data => {
        this.employees = data;
      }
    )
  }

  private defineSearchMode(): boolean {
    const paramName: string = 'value';
    this.searchMode = this.route.snapshot.paramMap.has(paramName);
    return this.searchMode;
  }

  private defineCurrentPositionId(): number[] {
    const paramName: string = 'id';
    if (!this.route.snapshot.paramMap.has(paramName)) {
      return this.currentPositionId = [];
    }
      
    var paramValue = this.route.snapshot.paramMap.get(paramName);
    if (paramValue == null) {
      return this.currentPositionId = [];
    }

    return this.currentPositionId = paramValue.split(',').map(item => parseInt(item));
  }
}
