import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcClientesComponent } from './wc-clientes.component';

describe('ClientesComponent', () => {
  let component: WcClientesComponent;
  let fixture: ComponentFixture<WcClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WcClientesComponent]
    });
    fixture = TestBed.createComponent(WcClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
