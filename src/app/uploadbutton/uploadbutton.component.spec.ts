import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadbuttonComponent } from './uploadbutton.component';

describe('UploadbuttonComponent', () => {
  let component: UploadbuttonComponent;
  let fixture: ComponentFixture<UploadbuttonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
