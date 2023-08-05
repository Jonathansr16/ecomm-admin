import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WcMainComponent } from './wc-main.component';

describe('MainComponent', () => {
  let component: WcMainComponent;
  let fixture: ComponentFixture<WcMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WcMainComponent]
    });
    fixture = TestBed.createComponent(WcMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
