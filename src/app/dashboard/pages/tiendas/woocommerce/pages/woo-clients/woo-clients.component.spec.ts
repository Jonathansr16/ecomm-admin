import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WooClientsComponent } from './woo-clients.component';

describe('WooClientsComponent', () => {
  let component: WooClientsComponent;
  let fixture: ComponentFixture<WooClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WooClientsComponent]
    });
    fixture = TestBed.createComponent(WooClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
