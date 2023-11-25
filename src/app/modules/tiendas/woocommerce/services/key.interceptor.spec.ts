import { TestBed } from '@angular/core/testing';

import { KeyInterceptor } from './key.interceptor';

describe('KeyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      KeyInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: KeyInterceptor = TestBed.inject(KeyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
