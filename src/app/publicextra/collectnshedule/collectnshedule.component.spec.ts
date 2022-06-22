import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectnsheduleComponent } from './collectnshedule.component';

describe('CollectnsheduleComponent', () => {
  let component: CollectnsheduleComponent;
  let fixture: ComponentFixture<CollectnsheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectnsheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectnsheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
