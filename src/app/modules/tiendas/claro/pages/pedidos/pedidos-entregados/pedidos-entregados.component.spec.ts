import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosEntregadosComponent } from './pedidos-entregados.component';

describe('PedidosEntregadosComponent', () => {
  let component: PedidosEntregadosComponent;
  let fixture: ComponentFixture<PedidosEntregadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosEntregadosComponent]
    });
    fixture = TestBed.createComponent(PedidosEntregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
