import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DbklpdfComponent } from './dbklpdf.component';

describe('DbklpdfComponent', () => {
  let component: DbklpdfComponent;
  let fixture: ComponentFixture<DbklpdfComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DbklpdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
