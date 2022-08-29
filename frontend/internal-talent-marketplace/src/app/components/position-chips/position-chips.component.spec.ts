import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionChipsComponent } from './position-chips.component';

describe('PositionChipsComponent', () => {
  let component: PositionChipsComponent;
  let fixture: ComponentFixture<PositionChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
