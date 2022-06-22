import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowchecklistformComponent } from './showchecklistform.component';

describe('ShowchecklistformComponent', () => {
  let component: ShowchecklistformComponent;
  let fixture: ComponentFixture<ShowchecklistformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowchecklistformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowchecklistformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
