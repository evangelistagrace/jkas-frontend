import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateInnvoiceComponent } from './create-innvoice.component';

describe('CreateInnvoiceComponent', () => {
  let component: CreateInnvoiceComponent;
  let fixture: ComponentFixture<CreateInnvoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInnvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInnvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
