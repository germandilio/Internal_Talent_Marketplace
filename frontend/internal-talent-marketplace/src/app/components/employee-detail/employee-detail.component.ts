import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/common/employee';
import { ConfigurableTeamService } from 'src/app/services/configurable-team.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee | undefined;

  constructor(private employeeService: EmployeeService,
              private configurableTeamService: ConfigurableTeamService,
              private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.paramMap.subscribe(() => {
        this.handleEmployeeDetail();
    });
  }

  addToTeam(employeeToAdd: Employee | undefined) {
    if (employeeToAdd == null) {
      return;
    }

    this.configurableTeamService.addToTeam(employeeToAdd);
  }

  private handleEmployeeDetail() {
      const stringId = this.route.snapshot.paramMap.get('id');
      if (stringId == null) {
        return;
      }

      const id = parseInt(stringId);
      this.employeeService.getEmployeesById(id).subscribe(
        data => {
          this.employee = data;
        }
      );
  }
}
