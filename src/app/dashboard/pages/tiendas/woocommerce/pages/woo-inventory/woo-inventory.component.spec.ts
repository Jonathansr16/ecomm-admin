import { ComponentFixture, TestBed } from '@angular/core/testing';
import WooInventoryComponent from './woo-inventory.component';

describe('WooInventoryComponent', () => {
  let component: WooInventoryComponent;
  let fixture: ComponentFixture<WooInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WooInventoryComponent]
    });
    fixture = TestBed.createComponent(WooInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
