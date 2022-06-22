import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklnoncomplianceComponent } from './dbklnoncompliance.component';

describe('DbklnoncomplianceComponent', () => {
  let component: DbklnoncomplianceComponent;
  let fixture: ComponentFixture<DbklnoncomplianceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklnoncomplianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklnoncomplianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
