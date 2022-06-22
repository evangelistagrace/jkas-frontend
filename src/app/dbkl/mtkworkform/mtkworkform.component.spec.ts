import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtkworkformComponent } from './mtkworkform.component';

describe('MtkworkformComponent', () => {
  let component: MtkworkformComponent;
  let fixture: ComponentFixture<MtkworkformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtkworkformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtkworkformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
