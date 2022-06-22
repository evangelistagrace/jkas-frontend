import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtbworkLogComponent } from './mtbwork-log.component';

describe('MtbworkLogComponent', () => {
  let component: MtbworkLogComponent;
  let fixture: ComponentFixture<MtbworkLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MtbworkLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtbworkLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
