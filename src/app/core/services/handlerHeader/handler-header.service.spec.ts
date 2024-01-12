import { TestBed } from '@angular/core/testing';

import { HandlerHeaderService } from './handler-header.service';

describe('HandlerHeaderService', () => {
  let service: HandlerHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlerHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
