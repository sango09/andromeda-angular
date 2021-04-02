import {Component, OnInit} from '@angular/core';
import {ImplementModel} from '../../../../../../core/modules/implement.model';
import {Message, MessageService, SelectItem} from 'primeng/api';
import {LoansService} from '../../../../../../core/services/modules/loans/loans.service';
import {TicketLoansService} from './ticketLoans.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-select-implement',
  templateUrl: './select-implement.component.html',
  styleUrls: ['./select-implement.css'],
  providers: [MessageService]
})
export class SelectImplementComponent implements OnInit {

  implements: ImplementModel[];
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  sortKey: string;
  data: any;
  loading = true;
  error: Message[];

  constructor(
    private loansService: LoansService,
    public ticketLoansService: TicketLoansService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.loansService.getAllInventoryLoans()
      .subscribe(res => {
        this.implements = res;
        this.loading = false;
      }, error => console.error(error));

    this.sortOptions = [
      {label: 'Mayor Disponibilidad', value: '!implements_available'},
      {label: 'Menor Disponibilidad', value: 'implements_available'}
    ];
    this.data = this.ticketLoansService.getLoansInformation();
  }

  onSortChange(event) {
    let value = event.value;
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  selectImplement(implement, available): void {
    if (available >= 1) {
      this.data.implement = implement;
      this.data.implements_available = available;
      this.ticketLoansService.ticketInformation = this.data;
    }
  }

  notSelectImplement(): void {
    this.data.implement = null;
    this.data.implements_available = null;
  }

  nextPage() {
    if (this.data.implement) {
      const nextStep = this.router.createUrlTree(['../extra_data'], {relativeTo: this.route});
      this.router.navigateByUrl(nextStep);
      return;
    } else {
      this.error = [
        {severity: 'error', summary: 'Error', detail: 'Selecciona un implemento'},
      ];
    }
  }

  prevPage() {
    const nextStep = this.router.createUrlTree(['../data'], {relativeTo: this.route});
    this.router.navigateByUrl(nextStep);
    return;
  }

}
