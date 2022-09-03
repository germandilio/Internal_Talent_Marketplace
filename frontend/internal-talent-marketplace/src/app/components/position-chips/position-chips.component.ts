import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Position } from 'src/app/common/position';
import { PositionsService } from 'src/app/services/positions.service';

@Component({
  selector: 'app-position-chips',
  templateUrl: './position-chips.component.html',
  styleUrls: ['./position-chips.component.css']
})
export class PositionChipsComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  positionCtrl = new FormControl('');

  filteredPositions: Observable<string[]>;

  positions: string[] = [];
  allPositions: string[] = [];

  mapNameToPosition: Map<string, Position> = new Map<string, Position>();

  @ViewChild('positionInput') positionInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private route: Router, private positionsService: PositionsService) {
    this.positionsService.getPositions().subscribe(data => {
      // create map
      for (const item of data) {
        this.mapNameToPosition.set(item.description || '', item);
      }

      // fill labels to display
      for (const item of data) {
        this.allPositions.push(item.description || '');
      }
    });

    this.filteredPositions = this.positionCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allPositions.slice())),
    );
  }

  getIds(): number[] {
    let ids: number[] = [];
    for (const label of this.positions) {
      var position = this.mapNameToPosition.get(label);
      if (position == null || position.id == null) continue;

      ids.push(position.id);
    }
    return ids;
  } 

  update() {
    var ids = this.getIds();
    this.positionsService.setIds(ids);

    this.route.navigateByUrl(`/position/${ids.join(',')}`);
  }

  dropFilter() {
    var ids = this.getIds();
    this.positionsService.setIds(ids);
    
    this.route.navigateByUrl(`/position`);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our position
    if (value) {
      this.positions.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.positionCtrl.setValue(null);
    this.update();
  }

  remove(position: string): void {
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
    this.positions.push(event.option.viewValue);
    if (this.positionInput != null) {
      this.positionInput.nativeElement.value = '';
    }
    this.update();
    this.positionCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    return this.allPositions.filter(position => position == value);
  }
}
