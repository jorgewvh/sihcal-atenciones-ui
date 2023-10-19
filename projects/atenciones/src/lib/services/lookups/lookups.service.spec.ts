import { TestBed } from '@angular/core/testing';

import { LookupsService } from './lookups.service';

describe('LookupsService', () => {
  let service: LookupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LookupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
