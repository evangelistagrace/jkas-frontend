import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManualuploadComponent } from './manualupload.component';

describe('ManualuploadComponent', () => {
  let component: ManualuploadComponent;
  let fixture: ComponentFixture<ManualuploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
