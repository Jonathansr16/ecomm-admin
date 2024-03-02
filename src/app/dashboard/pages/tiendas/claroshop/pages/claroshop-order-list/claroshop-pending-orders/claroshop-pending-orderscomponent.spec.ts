import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClaroshopPendingOrdersComponent } from './claroshop-pending-orders.component';

describe('ClaroshopPendingOrdersComponent', () => {
  let component: ClaroshopPendingOrdersComponent;
  let fixture: ComponentFixture<ClaroshopPendingOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaroshopPendingOrdersComponent]
    });
    fixture = TestBed.createComponent(ClaroshopPendingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
