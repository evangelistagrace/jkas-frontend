import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UploadnoncomplianceComponent } from './uploadnoncompliance.component';

describe('UploadnoncomplianceComponent', () => {
  let component: UploadnoncomplianceComponent;
  let fixture: ComponentFixture<UploadnoncomplianceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadnoncomplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadnoncomplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
