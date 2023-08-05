import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcProductosComponent } from './wc-productoscomponent';

describe('WoocommerceComponent', () => {
  let component: WcProductosComponent;
  let fixture: ComponentFixture<WcProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WcProductosComponent]
    });
    fixture = TestBed.createComponent(WcProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
