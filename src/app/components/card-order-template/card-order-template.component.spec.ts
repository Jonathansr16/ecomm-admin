import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrderTemplateComponent } from './card-order-template.component';

describe('PedidosOrderComponent', () => {
  let component: CardOrderTemplateComponent;
  let fixture: ComponentFixture<CardOrderTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardOrderTemplateComponent]
    });
    fixture = TestBed.createComponent(CardOrderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
