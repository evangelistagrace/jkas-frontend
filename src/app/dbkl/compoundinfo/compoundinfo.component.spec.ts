import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CompoundinfoComponent } from './compoundinfo.component';

describe('CompoundinfoComponent', () => {
  let component: CompoundinfoComponent;
  let fixture: ComponentFixture<CompoundinfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompoundinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompoundinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
