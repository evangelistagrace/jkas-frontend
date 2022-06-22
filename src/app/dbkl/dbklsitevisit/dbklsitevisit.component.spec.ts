import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklsitevisitComponent } from './dbklsitevisit.component';

describe('DbklsitevisitComponent', () => {
  let component: DbklsitevisitComponent;
  let fixture: ComponentFixture<DbklsitevisitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklsitevisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklsitevisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
