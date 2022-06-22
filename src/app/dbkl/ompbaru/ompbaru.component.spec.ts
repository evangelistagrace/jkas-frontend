import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OmpbaruComponent } from './ompbaru.component';

describe('OmpbaruComponent', () => {
  let component: OmpbaruComponent;
  let fixture: ComponentFixture<OmpbaruComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OmpbaruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmpbaruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
