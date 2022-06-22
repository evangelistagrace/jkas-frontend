import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnalisiskompaunComponent } from './analisiskompaun.component';

describe('AnalisiskompaunComponent', () => {
  let component: AnalisiskompaunComponent;
  let fixture: ComponentFixture<AnalisiskompaunComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisiskompaunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisiskompaunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
