import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorymapComponent } from './inventorymap.component';

describe('InventorymapComponent', () => {
  let component: InventorymapComponent;
  let fixture: ComponentFixture<InventorymapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorymapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
