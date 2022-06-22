import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleansheduleComponent } from './cleanshedule.component';

describe('CleansheduleComponent', () => {
  let component: CleansheduleComponent;
  let fixture: ComponentFixture<CleansheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleansheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleansheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
