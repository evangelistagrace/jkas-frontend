import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaklumatComponent } from './maklumat.component';

describe('MaklumatComponent', () => {
  let component: MaklumatComponent;
  let fixture: ComponentFixture<MaklumatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaklumatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaklumatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
