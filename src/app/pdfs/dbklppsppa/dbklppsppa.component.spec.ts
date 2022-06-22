import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklppsppaComponent } from './dbklppsppa.component';

describe('DbklppsppaComponent', () => {
  let component: DbklppsppaComponent;
  let fixture: ComponentFixture<DbklppsppaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklppsppaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklppsppaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
