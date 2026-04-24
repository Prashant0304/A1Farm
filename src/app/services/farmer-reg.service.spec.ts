import { TestBed } from '@angular/core/testing';

import { FarmerRegService } from './farmer-reg.service';

describe('FarmerRegService', () => {
  let service: FarmerRegService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerRegService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
