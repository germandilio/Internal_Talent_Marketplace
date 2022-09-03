import { TestBed } from '@angular/core/testing';

import { ConfigurableTeamService } from './configurable-team.service';

describe('ConfigurableTeamService', () => {
  let service: ConfigurableTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurableTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
