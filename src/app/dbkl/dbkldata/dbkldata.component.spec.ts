import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbkldataComponent } from './dbkldata.component';

describe('DbkldataComponent', () => {
  let component: DbkldataComponent;
  let fixture: ComponentFixture<DbkldataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbkldataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbkldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
