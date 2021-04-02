import {Component, OnInit} from '@angular/core';
import {TicketLoansService} from './ticketLoans.service';
import {LoansService} from '../../../../../../core/services/modules/loans/loans.service';
import {ImplementModel} from '../../../../../../core/modules/implement.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './ticket.component.html',
  styles: [`
    .loans-detail div {
      margin-bottom: 1rem;
    }

    .title {
      font-weight: bold;
    }
  `],
})
export class TicketComponent implements OnInit {

  ticket: any;
  date: number = Date.now();
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  implementSelected: ImplementModel[];

  constructor(
    private ticketLoansService: TicketLoansService,
    private loansService: LoansService,
  ) {
  }

  print(event: Event) {
    event.preventDefault();
    window.print();
  }

  ngOnInit(): void {
    this.ticket = this.ticketLoansService.getTicketLoansInformation();
    if (this.ticket) {
      this.loansService.getImplementInventory(this.ticket.implement)
        .subscribe(res => this.implementSelected = res, error => console.error(error));
    }
  }
}
