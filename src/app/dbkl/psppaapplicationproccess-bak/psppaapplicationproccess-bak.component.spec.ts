import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PsppaapplicationproccessBakComponent } from './psppaapplicationproccess-bak.component';

describe('PsppaapplicationproccessBakComponent', () => {
  let component: PsppaapplicationproccessBakComponent;
  let fixture: ComponentFixture<PsppaapplicationproccessBakComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PsppaapplicationproccessBakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsppaapplicationproccessBakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
