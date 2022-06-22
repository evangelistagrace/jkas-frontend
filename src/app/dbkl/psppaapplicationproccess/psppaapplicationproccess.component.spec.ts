import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PsppaapplicationproccessComponent } from './psppaapplicationproccess.component';

describe('PsppaapplicationproccessComponent', () => {
  let component: PsppaapplicationproccessComponent;
  let fixture: ComponentFixture<PsppaapplicationproccessComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PsppaapplicationproccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsppaapplicationproccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
