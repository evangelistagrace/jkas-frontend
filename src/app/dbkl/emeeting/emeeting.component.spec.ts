import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmeetingComponent } from './emeeting.component';

describe('EmeetingComponent', () => {
  let component: EmeetingComponent;
  let fixture: ComponentFixture<EmeetingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EmeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
