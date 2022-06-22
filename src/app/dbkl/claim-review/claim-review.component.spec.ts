import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClaimReviewComponent } from './claim-review.component';

describe('ClaimReviewComponent', () => {
  let component: ClaimReviewComponent;
  let fixture: ComponentFixture<ClaimReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
