import { TestBed } from '@angular/core/testing';
import { keyInterceptor } from './key.interceptor';



describe('KeyInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      keyInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: typeof keyInterceptor = TestBed.inject(keyInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
