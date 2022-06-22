import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterdoublecustombuttonComponent } from './filterdoublecustombutton.component';

describe('FilterdoublecustombuttonComponent', () => {
  let component: FilterdoublecustombuttonComponent;
  let fixture: ComponentFixture<FilterdoublecustombuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterdoublecustombuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterdoublecustombuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
