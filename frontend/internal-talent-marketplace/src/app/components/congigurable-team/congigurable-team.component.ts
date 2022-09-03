import { Component, OnInit } from '@angular/core';
import { ConfigurableTeamService } from 'src/app/services/configurable-team.service';

@Component({
  selector: 'app-congigurable-team',
  templateUrl: './congigurable-team.component.html',
  styleUrls: ['./congigurable-team.component.css']
})
export class CongigurableTeamComponent implements OnInit {

  totalCount: number = 0;

  constructor(private congigurableTeamService: ConfigurableTeamService) {
    this.updateTeamStatus();
   }

  ngOnInit(): void {
    this.updateTeamStatus();
  }

  updateTeamStatus() {
    this.congigurableTeamService.getTeamEmployees();
    
    this.congigurableTeamService.totalCount.subscribe(
      data => this.totalCount = data
    );
  }
}
