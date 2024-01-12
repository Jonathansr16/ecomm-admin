import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersQuantityCardComponent } from './orders-quantity-card.component';

describe('OrdersQuantityCardComponent', () => {
  let component: OrdersQuantityCardComponent;
  let fixture: ComponentFixture<OrdersQuantityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OrdersQuantityCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersQuantityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
