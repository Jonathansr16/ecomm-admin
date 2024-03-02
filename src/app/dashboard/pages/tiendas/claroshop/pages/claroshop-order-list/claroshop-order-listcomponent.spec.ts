import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaroshopOrderListComponent } from './claroshop-order-list.component';

describe('ClaroshopOrderListComponent', () => {
  let component: ClaroshopOrderListComponent;
  let fixture: ComponentFixture<ClaroshopOrderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaroshopOrderListComponent]
    });
    fixture = TestBed.createComponent(ClaroshopOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
