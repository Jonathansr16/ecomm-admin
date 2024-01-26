import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSearchProductComponent } from './search-product.component';

describe('CardSearchProductComponent', () => {
  let component: CardSearchProductComponent;
  let fixture: ComponentFixture<CardSearchProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CardSearchProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSearchProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
