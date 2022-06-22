import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewemeetingComponent } from './newemeeting.component';

describe('NewemeetingComponent', () => {
  let component: NewemeetingComponent;
  let fixture: ComponentFixture<NewemeetingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewemeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewemeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
