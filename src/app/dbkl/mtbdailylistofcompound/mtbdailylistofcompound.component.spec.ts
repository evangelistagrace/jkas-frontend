import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtbdailylistofcompoundComponent } from './mtbdailylistofcompound.component';

describe('MtbdailylistofcompoundComponent', () => {
  let component: MtbdailylistofcompoundComponent;
  let fixture: ComponentFixture<MtbdailylistofcompoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtbdailylistofcompoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbdailylistofcompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
