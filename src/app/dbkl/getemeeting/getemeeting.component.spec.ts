import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GetemeetingComponent } from './getemeeting.component';

describe('GetemeetingComponent', () => {
  let component: GetemeetingComponent;
  let fixture: ComponentFixture<GetemeetingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GetemeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetemeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
