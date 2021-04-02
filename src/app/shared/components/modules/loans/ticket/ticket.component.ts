import {Component, OnInit} from '@angular/core';
import {LoansService} from '../../../../../core/services/modules/loans/loans.service';
import {ActivatedRoute, Params} from '@angular/router';
import {LoansModel} from '../../../../../core/modules/loans.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],

})
export class TicketComponent implements OnInit {
  id: string;
  loan: LoansModel;
  loading = true;

  constructor(
    private loansService: LoansService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.loansService.getLoan(this.id)
        .subscribe(res => {
          this.loan = res;
          this.loading = false;
        }, error => console.error(error));
    });
  }

  ngOnInit(): void {

  }

  print(event: Event) {
    event.preventDefault();
    window.print();
  }

}
