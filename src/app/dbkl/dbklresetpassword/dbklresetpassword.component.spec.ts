import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklresetpasswordComponent } from './dbklresetpassword.component';

describe('DbklresetpasswordComponent', () => {
  let component: DbklresetpasswordComponent;
  let fixture: ComponentFixture<DbklresetpasswordComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklresetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklresetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
