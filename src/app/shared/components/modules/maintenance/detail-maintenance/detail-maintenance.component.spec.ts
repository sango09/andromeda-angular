import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMaintenanceComponent } from './detail-maintenance.component';

describe('TicketMaintenanceComponent', () => {
  let component: DetailMaintenanceComponent;
  let fixture: ComponentFixture<DetailMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMaintenanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
