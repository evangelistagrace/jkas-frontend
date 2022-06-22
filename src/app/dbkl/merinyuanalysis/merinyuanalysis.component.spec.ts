import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MerinyuanalysisComponent } from './merinyuanalysis.component';

describe('MerinyuanalysisComponent', () => {
  let component: MerinyuanalysisComponent;
  let fixture: ComponentFixture<MerinyuanalysisComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MerinyuanalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerinyuanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
