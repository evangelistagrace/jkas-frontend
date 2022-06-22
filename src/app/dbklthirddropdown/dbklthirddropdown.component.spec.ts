import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklthirddropdownComponent } from './dbklthirddropdown.component';

describe('DbklthirddropdownComponent', () => {
  let component: DbklthirddropdownComponent;
  let fixture: ComponentFixture<DbklthirddropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklthirddropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklthirddropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
