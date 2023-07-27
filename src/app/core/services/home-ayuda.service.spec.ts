import { TestBed } from '@angular/core/testing';

import { HomeAyudaService } from './home-ayuda.service';

describe('HomeAyudaService', () => {
  let service: HomeAyudaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeAyudaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
