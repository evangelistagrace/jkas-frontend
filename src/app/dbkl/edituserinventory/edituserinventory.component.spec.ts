import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EdituserinventoryComponent } from './edituserinventory.component';

describe('EdituserinventoryComponent', () => {
  let component: EdituserinventoryComponent;
  let fixture: ComponentFixture<EdituserinventoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituserinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
