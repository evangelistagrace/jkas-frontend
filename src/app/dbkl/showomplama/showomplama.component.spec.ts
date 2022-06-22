import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowomplamaComponent } from './showomplama.component';

describe('ShowomplamaComponent', () => {
  let component: ShowomplamaComponent;
  let fixture: ComponentFixture<ShowomplamaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowomplamaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowomplamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
