import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtbworkFormComponent } from './mtbwork-form.component';

describe('MtbworkFormComponent', () => {
  let component: MtbworkFormComponent;
  let fixture: ComponentFixture<MtbworkFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtbworkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbworkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
