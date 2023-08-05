import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoInfoComponent } from './producto-info.component';

describe('ProductoInfoComponent', () => {
  let component: ProductoInfoComponent;
  let fixture: ComponentFixture<ProductoInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoInfoComponent]
    });
    fixture = TestBed.createComponent(ProductoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
