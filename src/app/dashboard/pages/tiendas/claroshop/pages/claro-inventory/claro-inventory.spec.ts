import { ComponentFixture, TestBed } from '@angular/core/testing';
import ClaroInventoryComponent from './claro-inventory.component';

describe('ClaroInventarioComponent', () => {
  let component: ClaroInventoryComponent;
  let fixture: ComponentFixture<ClaroInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaroInventoryComponent]
    });
    fixture = TestBed.createComponent(ClaroInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
