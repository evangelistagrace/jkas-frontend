import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InspectingofficersComponent } from './inspectingofficers.component';

describe('InspectingofficersComponent', () => {
  let component: InspectingofficersComponent;
  let fixture: ComponentFixture<InspectingofficersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectingofficersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectingofficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
