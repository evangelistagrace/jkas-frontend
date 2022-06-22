import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklseconddropdownComponent } from './dbklseconddropdown.component';

describe('DbklseconddropdownComponent', () => {
  let component: DbklseconddropdownComponent;
  let fixture: ComponentFixture<DbklseconddropdownComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklseconddropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklseconddropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
