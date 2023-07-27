import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelyComponent } from './mely.component';

describe('MelyComponent', () => {
  let component: MelyComponent;
  let fixture: ComponentFixture<MelyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MelyComponent]
    });
    fixture = TestBed.createComponent(MelyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
