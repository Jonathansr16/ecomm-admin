import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcNewProductComponent } from './wc-new-product.component';

describe('WcNewProductComponent', () => {
  let component: WcNewProductComponent;
  let fixture: ComponentFixture<WcNewProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WcNewProductComponent]
    });
    fixture = TestBed.createComponent(WcNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
