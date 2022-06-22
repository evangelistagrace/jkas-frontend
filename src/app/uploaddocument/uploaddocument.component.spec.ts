import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploaddocumentComponent } from './uploaddocument.component';

describe('UploaddocumentComponent', () => {
  let component: UploaddocumentComponent;
  let fixture: ComponentFixture<UploaddocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaddocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaddocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
