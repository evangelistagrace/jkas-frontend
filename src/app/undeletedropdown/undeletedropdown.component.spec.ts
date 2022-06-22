import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UndeletedropdownComponent } from './undeletedropdown.component';

describe('UndeletedropdownComponent', () => {
  let component: UndeletedropdownComponent;
  let fixture: ComponentFixture<UndeletedropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UndeletedropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndeletedropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
