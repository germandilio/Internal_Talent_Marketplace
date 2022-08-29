import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-position-chips',
  templateUrl: './position-chips.component.html',
  styleUrls: ['./position-chips.component.css']
})
export class PositionChipsComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  positionCtrl = new FormControl('');

  filteredPositions: Observable<number[]>;

  positions: number[] = [];
  allPositions: number[] = [1, 2, 3, 4, 5];

  @ViewChild('positionInput') positionInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private route: Router) {
    this.filteredPositions = this.positionCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allPositions.slice())),
    );
  }

  update() {
    this.route.navigateByUrl(`/position/${this.positions.join(',')}`);
  }

  dropFilter() {
    this.route.navigateByUrl(`/position`);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our position
    if (value) {
      this.positions.push(parseInt(value));
    }

    // Clear the input value
    event.chipInput!.clear();

    this.positionCtrl.setValue(null);
    this.update();
  }

  remove(position: number): void {
    const index = this.positions.indexOf(position);

    if (index >= 0) {
      this.positions.splice(index, 1);  
    }

    if (this.positions.length < 1) {
      this.dropFilter();
    } else {
      this.update();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.positions.push(parseInt(event.option.viewValue));
    if (this.positionInput != null) {
      this.positionInput.nativeElement.value = '';
    }
    this.update();
    this.positionCtrl.setValue(null);
  }

  private _filter(value: string): number[] {
    const filterValue = parseInt(value);

    return this.allPositions.filter(position => position == filterValue);
  }
}
