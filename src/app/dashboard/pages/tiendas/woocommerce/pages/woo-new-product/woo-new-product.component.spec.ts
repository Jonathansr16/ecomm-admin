import { ComponentFixture, TestBed } from '@angular/core/testing';
import WooNewProductComponent from './woo-new-product.component';

describe('WooNewProductComponent', () => {
  let component: WooNewProductComponent;
  let fixture: ComponentFixture<WooNewProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WooNewProductComponent]
    });
    fixture = TestBed.createComponent(WooNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
