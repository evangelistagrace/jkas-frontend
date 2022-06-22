import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompoundinspectingofficerComponent } from './compoundinspectingofficer.component';

describe('CompoundinspectingofficerComponent', () => {
  let component: CompoundinspectingofficerComponent;
  let fixture: ComponentFixture<CompoundinspectingofficerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundinspectingofficerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundinspectingofficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
