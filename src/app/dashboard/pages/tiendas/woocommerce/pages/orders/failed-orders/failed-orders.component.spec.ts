import { ComponentFixture, TestBed } from '@angular/core/testing';
import FailedOrdersComponent from './failed-orders.component';

describe('FailedOrdesComponent', () => {
  let component: FailedOrdersComponent;
  let fixture: ComponentFixture<FailedOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailedOrdersComponent]
    });
    fixture = TestBed.createComponent(FailedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
