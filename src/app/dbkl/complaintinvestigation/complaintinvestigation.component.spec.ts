import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComplaintinvestigationComponent } from './complaintinvestigation.component';

describe('ComplaintinvestigationComponent', () => {
  let component: ComplaintinvestigationComponent;
  let fixture: ComponentFixture<ComplaintinvestigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintinvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintinvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
