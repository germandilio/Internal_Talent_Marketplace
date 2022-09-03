import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoonfigurableTeamDetailComponent } from './coonfigurable-team-detail.component';

describe('CoonfigurableTeamDetailComponent', () => {
  let component: CoonfigurableTeamDetailComponent;
  let fixture: ComponentFixture<CoonfigurableTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoonfigurableTeamDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoonfigurableTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
