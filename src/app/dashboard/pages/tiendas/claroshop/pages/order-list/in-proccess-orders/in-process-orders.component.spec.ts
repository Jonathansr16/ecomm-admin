import { ComponentFixture, TestBed } from '@angular/core/testing';
import InProcessOrdersComponent from './in-process-orders.component';


describe('InProcessOrdersComponent', () => {
  let component: InProcessOrdersComponent;
  let fixture: ComponentFixture<InProcessOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InProcessOrdersComponent]
    });
    fixture = TestBed.createComponent(InProcessOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
