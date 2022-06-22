import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtkmapviewComponent } from './mtkmapview.component';

describe('MtkmapviewComponent', () => {
  let component: MtkmapviewComponent;
  let fixture: ComponentFixture<MtkmapviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtkmapviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtkmapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
