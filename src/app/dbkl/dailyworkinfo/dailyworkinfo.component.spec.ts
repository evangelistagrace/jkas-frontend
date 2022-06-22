import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DailyworkinfoComponent } from './dailyworkinfo.component';

describe('DailyworkinfoComponent', () => {
  let component: DailyworkinfoComponent;
  let fixture: ComponentFixture<DailyworkinfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyworkinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyworkinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
