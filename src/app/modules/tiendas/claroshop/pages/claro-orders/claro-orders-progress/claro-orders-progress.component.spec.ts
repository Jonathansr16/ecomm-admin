import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaroOrdersProgressComponent } from './claro-orders-progress.component';

describe('ClaroOrdersProgressComponent', () => {
  let component: ClaroOrdersProgressComponent;
  let fixture: ComponentFixture<ClaroOrdersProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaroOrdersProgressComponent]
    });
    fixture = TestBed.createComponent(ClaroOrdersProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
