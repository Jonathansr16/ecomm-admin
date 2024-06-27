import { ComponentFixture, TestBed } from '@angular/core/testing';
import WooOrdersComponent from './woo-orders.component';



describe('OrdersComponent', () => {
  let component: WooOrdersComponent;
  let fixture: ComponentFixture<WooOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WooOrdersComponent]
    });
    fixture = TestBed.createComponent(WooOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
