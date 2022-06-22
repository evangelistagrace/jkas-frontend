import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HalamauthamaComponent } from './halamauthama.component';

describe('HalamauthamaComponent', () => {
  let component: HalamauthamaComponent;
  let fixture: ComponentFixture<HalamauthamaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HalamauthamaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HalamauthamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
