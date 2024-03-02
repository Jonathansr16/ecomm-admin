import { ComponentFixture, TestBed } from '@angular/core/testing';
import ClaroshopInProcessOrdersComponent from './claroshop-in-process-orders.component';


describe('ClaroshopInProcessOrdersComponent', () => {
  let component: ClaroshopInProcessOrdersComponent;
  let fixture: ComponentFixture<ClaroshopInProcessOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaroshopInProcessOrdersComponent]
    });
    fixture = TestBed.createComponent(ClaroshopInProcessOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
