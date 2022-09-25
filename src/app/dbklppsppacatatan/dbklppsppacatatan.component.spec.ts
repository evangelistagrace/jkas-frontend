import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbklppsppacatatanComponent } from './dbklppsppacatatan.component';

describe('DbklppsppacatatanComponent', () => {
  let component: DbklppsppacatatanComponent;
  let fixture: ComponentFixture<DbklppsppacatatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbklppsppacatatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbklppsppacatatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
