import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicppsppaComponent } from './publicppsppa.component';

describe('PublicppsppaComponent', () => {
  let component: PublicppsppaComponent;
  let fixture: ComponentFixture<PublicppsppaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicppsppaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicppsppaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
