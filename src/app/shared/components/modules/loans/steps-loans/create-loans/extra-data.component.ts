import {Component, OnInit} from '@angular/core';
import {TicketLoansService} from './ticketLoans.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoansService} from '../../../../../../core/services/modules/loans/loans.service';
import {Message, MessageService} from 'primeng/api';

@Component({
  selector: 'app-date-loans',
  templateUrl: './extra-data.component.html',
  providers: [MessageService]
})
export class ExtraDataComponent implements OnInit {

  data: any;
  ticket: any;
  error: boolean;
  errorPost: Message[];

  constructor(
    private ticketLoansService: TicketLoansService,
    private loansService: LoansService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.data = this.ticketLoansService.getLoansInformation();
    this.ticket = this.ticketLoansService.getTicketLoansInformation();
  }


  createLoans() {
    delete this.data.implements_available;
    if (this.data.ammount_implements) {
      this.loansService.createLoans(this.data)
        .subscribe(res => {
            this.ticketLoansService.ticketInformation = res;
            const nextStep = this.router.createUrlTree(['../ticket'], {relativeTo: this.route});
            this.router.navigateByUrl(nextStep);
            return;
          },
          error => this.errorPost = [{severity: 'error', detail: error.loans_date}])
    } else {
      this.error = true;
    }

  }

  prevPage() {
    const prevStep = this.router.createUrlTree(['../select_implement'], {relativeTo: this.route});
    this.router.navigateByUrl(prevStep);
    return;
  }
}
