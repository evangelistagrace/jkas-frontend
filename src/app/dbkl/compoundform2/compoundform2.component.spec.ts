import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Compoundform2Component } from './compoundform2.component';

describe('Compoundform2Component', () => {
  let component: Compoundform2Component;
  let fixture: ComponentFixture<Compoundform2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Compoundform2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Compoundform2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
