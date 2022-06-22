import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtbcompoundformComponent } from './mtbcompoundform.component';

describe('MtbcompoundformComponent', () => {
  let component: MtbcompoundformComponent;
  let fixture: ComponentFixture<MtbcompoundformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtbcompoundformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbcompoundformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
