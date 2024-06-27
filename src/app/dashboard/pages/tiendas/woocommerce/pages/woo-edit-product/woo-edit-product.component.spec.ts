import { ComponentFixture, TestBed } from '@angular/core/testing';
import WooEditProductComponent from './woo-edit-product.component';


describe('WooEditProductComponent', () => {
  let component: WooEditProductComponent;
  let fixture: ComponentFixture<WooEditProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WooEditProductComponent]
    });
    fixture = TestBed.createComponent(WooEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
