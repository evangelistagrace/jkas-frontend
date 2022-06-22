import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NoncomplianceComponent } from './noncompliance.component';

describe('NoncomplianceComponent', () => {
  let component: NoncomplianceComponent;
  let fixture: ComponentFixture<NoncomplianceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoncomplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoncomplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
