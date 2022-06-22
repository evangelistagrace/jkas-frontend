import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklchecklistComponent } from './dbklchecklist.component';

describe('DbklchecklistComponent', () => {
  let component: DbklchecklistComponent;
  let fixture: ComponentFixture<DbklchecklistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklchecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklchecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
