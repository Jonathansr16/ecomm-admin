import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosEmbarcadosComponent } from './pedidos-embarcados.component';

describe('PedidosEmbarcadosComponent', () => {
  let component: PedidosEmbarcadosComponent;
  let fixture: ComponentFixture<PedidosEmbarcadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosEmbarcadosComponent]
    });
    fixture = TestBed.createComponent(PedidosEmbarcadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
