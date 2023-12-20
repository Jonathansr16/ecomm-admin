import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WooOrdersCompletedComponent } from './woo-orders-completed.component';

describe('WooOrdersCompletedComponent', () => {
  let component: WooOrdersCompletedComponent;
  let fixture: ComponentFixture<WooOrdersCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WooOrdersCompletedComponent]
    });
    fixture = TestBed.createComponent(WooOrdersCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
