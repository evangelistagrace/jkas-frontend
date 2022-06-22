import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DemoTextComponent } from './demo-text.component';

describe('DemoTextComponent', () => {
  let component: DemoTextComponent;
  let fixture: ComponentFixture<DemoTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
