import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChecklistoptionComponent } from './checklistoption.component';

describe('ChecklistoptionComponent', () => {
  let component: ChecklistoptionComponent;
  let fixture: ComponentFixture<ChecklistoptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistoptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
