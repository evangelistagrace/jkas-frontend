import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventorymanagmentComponent } from './inventorymanagment.component';

describe('InventorymanagmentComponent', () => {
  let component: InventorymanagmentComponent;
  let fixture: ComponentFixture<InventorymanagmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorymanagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorymanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
