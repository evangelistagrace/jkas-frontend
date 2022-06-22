import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ANNOUCEMENTSComponent } from './annoucements.component';

describe('ANNOUCEMENTSComponent', () => {
  let component: ANNOUCEMENTSComponent;
  let fixture: ComponentFixture<ANNOUCEMENTSComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ANNOUCEMENTSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ANNOUCEMENTSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
