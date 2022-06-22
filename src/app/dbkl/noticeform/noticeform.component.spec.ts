import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NoticeformComponent } from './noticeform.component';

describe('NoticeformComponent', () => {
  let component: NoticeformComponent;
  let fixture: ComponentFixture<NoticeformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
