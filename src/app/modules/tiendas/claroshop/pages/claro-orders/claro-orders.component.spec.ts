import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaroOrdersComponent } from './claro-orders.component';

describe('ClaroOrdersComponent', () => {
  let component: ClaroOrdersComponent;
  let fixture: ComponentFixture<ClaroOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaroOrdersComponent]
    });
    fixture = TestBed.createComponent(ClaroOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
