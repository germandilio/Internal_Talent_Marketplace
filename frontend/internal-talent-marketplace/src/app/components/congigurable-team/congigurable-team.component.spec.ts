import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongigurableTeamComponent } from './congigurable-team.component';

describe('CongigurableTeamComponent', () => {
  let component: CongigurableTeamComponent;
  let fixture: ComponentFixture<CongigurableTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongigurableTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CongigurableTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
