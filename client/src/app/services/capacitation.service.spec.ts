import { TestBed } from '@angular/core/testing';

import { CapacitationService } from './capacitation.service';

describe('CapacitationService', () => {
  let service: CapacitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
