import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-employees',
  templateUrl: './search-employees.component.html',
  styleUrls: ['./search-employees.component.css']
})
export class SearchEmployeesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchEmployees(value: string) {
    this.router.navigateByUrl(`/search/${value.trim()}`)
  }

}
