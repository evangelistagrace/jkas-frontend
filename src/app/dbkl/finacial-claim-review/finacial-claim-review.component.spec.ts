import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinacialClaimReviewComponent } from './finacial-claim-review.component';

describe('FinacialClaimReviewComponent', () => {
  let component: FinacialClaimReviewComponent;
  let fixture: ComponentFixture<FinacialClaimReviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinacialClaimReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinacialClaimReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
