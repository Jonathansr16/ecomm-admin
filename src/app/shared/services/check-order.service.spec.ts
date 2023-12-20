import { TestBed } from '@angular/core/testing';

import { CheckOrderService } from './check-order.service';

describe('CheckOrderService', () => {
  let service: CheckOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
