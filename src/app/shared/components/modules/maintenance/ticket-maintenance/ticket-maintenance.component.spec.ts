import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketMaintenanceComponent } from './ticket-maintenance.component';

describe('TicketMaintenanceComponent', () => {
  let component: TicketMaintenanceComponent;
  let fixture: ComponentFixture<TicketMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
