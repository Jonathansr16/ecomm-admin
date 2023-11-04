import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCanceladosComponent } from './pedidos-cancelados.component';

describe('PedidosCanceladosComponent', () => {
  let component: PedidosCanceladosComponent;
  let fixture: ComponentFixture<PedidosCanceladosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosCanceladosComponent]
    });
    fixture = TestBed.createComponent(PedidosCanceladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
