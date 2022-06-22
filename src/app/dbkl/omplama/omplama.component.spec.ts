import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OmplamaComponent } from './omplama.component';

describe('OmplamaComponent', () => {
  let component: OmplamaComponent;
  let fixture: ComponentFixture<OmplamaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OmplamaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmplamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
