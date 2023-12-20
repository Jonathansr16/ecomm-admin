import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrderTemplateComponent } from './search-order-template.component';

describe('SearchOrderComponent', () => {
  let component: SearchOrderTemplateComponent;
  let fixture: ComponentFixture<SearchOrderTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchOrderTemplateComponent]
    });
    fixture = TestBed.createComponent(SearchOrderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
