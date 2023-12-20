import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaroOrdersPendingComponent } from './claro-orders-pending.component';

describe('ClaroOrdersPendingComponent', () => {
  let component: ClaroOrdersPendingComponent;
  let fixture: ComponentFixture<ClaroOrdersPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaroOrdersPendingComponent]
    });
    fixture = TestBed.createComponent(ClaroOrdersPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
