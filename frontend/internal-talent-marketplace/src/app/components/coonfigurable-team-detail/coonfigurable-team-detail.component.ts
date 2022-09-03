import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/common/employee';
import { ConfigurableTeamService } from 'src/app/services/configurable-team.service';

@Component({
  selector: 'app-coonfigurable-team-detail',
  templateUrl: './coonfigurable-team-detail.component.html',
  styleUrls: ['./coonfigurable-team-detail.component.css']
})
export class CoonfigurableTeamDetailComponent implements OnInit {

  constructor(private teamService: ConfigurableTeamService) { }

  ngOnInit(): void {
  }

  getEmployees():Employee[] {
    return this.teamService.getTeamEmployees();
  }


  getTotalEmployeesCountByPosition(): Map<string | undefined, number> {
    let emplByPos = new Map<string | undefined, number>();

    this.getEmployees().forEach(empl => {
      if (emplByPos.has(empl.positionName)) {
        var count = emplByPos.get(empl.positionName);
        if (count == null) {
          count = 0;
        }
        emplByPos.set(empl.positionName, count + 1);
      } else {
        emplByPos.set(empl.positionName, 1);
      }
    });

    return emplByPos;
  }

}
