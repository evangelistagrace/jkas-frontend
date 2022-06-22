import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtbcomplaintInvestigationComponent } from './mtbcomplaint-investigation.component';

describe('MtbcomplaintInvestigationComponent', () => {
  let component: MtbcomplaintInvestigationComponent;
  let fixture: ComponentFixture<MtbcomplaintInvestigationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtbcomplaintInvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbcomplaintInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
