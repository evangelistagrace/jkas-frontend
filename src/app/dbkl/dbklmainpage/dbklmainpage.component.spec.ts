import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklmainpageComponent } from './dbklmainpage.component';

describe('DbklmainpageComponent', () => {
  let component: DbklmainpageComponent;
  let fixture: ComponentFixture<DbklmainpageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklmainpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklmainpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
