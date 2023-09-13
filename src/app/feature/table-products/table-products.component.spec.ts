import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductsComponent } from './table-products.component';

describe('TableComponent', () => {
  let component: TableProductsComponent;
  let fixture: ComponentFixture<TableProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableProductsComponent]
    });
    fixture = TestBed.createComponent(TableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
