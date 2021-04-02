import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {TicketLoansService} from './ticketLoans.service';

@Component({
  selector: 'app-create-loans',
  templateUrl: './stepsloans.component.html',
  styleUrls: ['../../../../../../../assets/css/dashboard/dashboard.css'],
  providers: [MessageService]
})
export class StepsloansComponent implements OnInit {

  items: MenuItem[];

  constructor(
    public ticketService: TicketLoansService
  ) {
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Datos de servicio',
      routerLink: 'data'
    },
      {
        label: 'Implemento',
        routerLink: 'select_implement'
      },
      {
        label: 'Datos extras',
        routerLink: 'extra_data'
      },
      {
        label: 'Ticket',
        routerLink: 'ticket'
      }
    ];
  }

}
