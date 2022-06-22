import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListemeetingComponent } from './listemeeting.component';

describe('ListemeetingComponent', () => {
  let component: ListemeetingComponent;
  let fixture: ComponentFixture<ListemeetingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListemeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListemeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
