import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtbgetcompoundformComponent } from './mtbgetcompoundform.component';

describe('MtbgetcompoundformComponent', () => {
  let component: MtbgetcompoundformComponent;
  let fixture: ComponentFixture<MtbgetcompoundformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtbgetcompoundformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbgetcompoundformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
