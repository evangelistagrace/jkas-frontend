import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtkcompoundformComponent } from './mtkcompoundform.component';

describe('MtkcompoundformComponent', () => {
  let component: MtkcompoundformComponent;
  let fixture: ComponentFixture<MtkcompoundformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtkcompoundformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtkcompoundformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
