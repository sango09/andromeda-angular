import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSupportComponent } from './ticket-support.component';

// @ts-ignore
describe('TicketSupportComponent', () => {
  let component: TicketSupportComponent;
  let fixture: ComponentFixture<TicketSupportComponent>;

  // @ts-ignore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketSupportComponent ]
    })
    .compileComponents();
  });

  // @ts-ignore
  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // @ts-ignore
  it('should create', () => {
    // @ts-ignore
    expect(component).toBeTruthy();
  });
});
