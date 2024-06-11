import { TestBed } from '@angular/core/testing';

import { ClaroService} from './claro-order.service';

describe('ClaroserviceService', () => {
  let service: ClaroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
