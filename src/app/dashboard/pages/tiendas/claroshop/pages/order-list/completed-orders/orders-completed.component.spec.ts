import { ComponentFixture, TestBed } from '@angular/core/testing';
import OrdersCompletedComponent from './orders-completed.component';

describe('OrdersCompletedComponent', () => {
  let component: OrdersCompletedComponent;
  let fixture: ComponentFixture<OrdersCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersCompletedComponent]
    });
    fixture = TestBed.createComponent(OrdersCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
