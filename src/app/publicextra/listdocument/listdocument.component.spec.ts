import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListdocumentComponent } from './listdocument.component';

describe('ListdocumentComponent', () => {
  let component: ListdocumentComponent;
  let fixture: ComponentFixture<ListdocumentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
