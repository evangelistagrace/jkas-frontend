import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbkluploadbuttonComponent } from './dbkluploadbutton.component';

describe('DbkluploadbuttonComponent', () => {
  let component: DbkluploadbuttonComponent;
  let fixture: ComponentFixture<DbkluploadbuttonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbkluploadbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbkluploadbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
