import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaroOrdersCompletedComponent } from './claro-orders-completed.component';

describe('ClaroOrdersCompletedComponent', () => {
  let component: ClaroOrdersCompletedComponent;
  let fixture: ComponentFixture<ClaroOrdersCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaroOrdersCompletedComponent]
    });
    fixture = TestBed.createComponent(ClaroOrdersCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
