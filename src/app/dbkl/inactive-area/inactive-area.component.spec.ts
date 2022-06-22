import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveAreaComponent } from './inactive-area.component';

describe('InactiveAreaComponent', () => {
  let component: InactiveAreaComponent;
  let fixture: ComponentFixture<InactiveAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
