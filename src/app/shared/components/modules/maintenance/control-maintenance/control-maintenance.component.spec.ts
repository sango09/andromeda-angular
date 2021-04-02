import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlMaintenanceComponent } from './control-maintenance.component';

describe('ControlMaintenanceComponent', () => {
  let component: ControlMaintenanceComponent;
  let fixture: ComponentFixture<ControlMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
