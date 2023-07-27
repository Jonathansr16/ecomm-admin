import { TestBed } from '@angular/core/testing';

import { WcommerceService } from './wcommerce.service';

describe('WcommerceService', () => {
  let service: WcommerceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WcommerceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
