import { TestBed } from '@angular/core/testing';

import { ClaroserviceService } from './claroservice.service';

describe('ClaroserviceService', () => {
  let service: ClaroserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaroserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
