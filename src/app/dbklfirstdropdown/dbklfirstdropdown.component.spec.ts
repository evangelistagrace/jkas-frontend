import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklfirstdropdownComponent } from './dbklfirstdropdown.component';

describe('DbklfirstdropdownComponent', () => {
  let component: DbklfirstdropdownComponent;
  let fixture: ComponentFixture<DbklfirstdropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklfirstdropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklfirstdropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
