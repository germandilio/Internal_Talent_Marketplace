import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PositionsService } from 'src/app/services/positions.service';
import { PositionChipsComponent } from '../position-chips/position-chips.component';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.css']
})
export class SearchEmployeesComponent implements OnInit {

  value: string = '';

  constructor(private router: Router,
    private positionService: PositionsService) { }

  ngOnInit(): void {
  }

  searchEmployees(value: string) {
    this.value = value;

    var ids = this.positionService.ids;
    if (ids.length > 0) {
      this.router.navigateByUrl(`/search/position/${ids.join(',')}/${value.trim()}`)
    } else {
      this.router.navigateByUrl(`/search/${value.trim()}`)
    }
  }
}
