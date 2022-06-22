import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltercustombuttonComponent } from './filtercustombutton.component';

describe('FiltercustombuttonComponent', () => {
  let component: FiltercustombuttonComponent;
  let fixture: ComponentFixture<FiltercustombuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltercustombuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltercustombuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
