import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtblistofcompoundComponent } from './mtblistofcompound.component';

describe('MtblistofcompoundComponent', () => {
  let component: MtblistofcompoundComponent;
  let fixture: ComponentFixture<MtblistofcompoundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtblistofcompoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtblistofcompoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
