import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCompletadosComponent } from './pedidos-completados.component';

describe('PedidosCompletadosComponent', () => {
  let component: PedidosCompletadosComponent;
  let fixture: ComponentFixture<PedidosCompletadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosCompletadosComponent]
    });
    fixture = TestBed.createComponent(PedidosCompletadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
