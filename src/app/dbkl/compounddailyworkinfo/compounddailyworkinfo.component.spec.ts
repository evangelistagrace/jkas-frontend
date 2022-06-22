import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompounddailyworkinfoComponent } from './compounddailyworkinfo.component';

describe('CompounddailyworkinfoComponent', () => {
  let component: CompounddailyworkinfoComponent;
  let fixture: ComponentFixture<CompounddailyworkinfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompounddailyworkinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompounddailyworkinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
