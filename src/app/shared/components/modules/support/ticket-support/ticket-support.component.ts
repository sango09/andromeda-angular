import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../../environments/environment';
import {SupportService} from '../../../../../core/services/modules/support/support.service';

@Component({
  selector: 'app-ticket-support',
  templateUrl: './ticket-support.component.html',
  styleUrls: ['../../../../../../assets/css/dashboard/dashboard.css'],
})
export class TicketSupportComponent implements OnInit {

  iconPrint = 'pi pi-print';
  ticket: any;
  date: number = Date.now();
  userInfo = JSON.parse(localStorage.getItem('userInfo'));
  environment = environment.url_api;

  constructor(
    private supportService: SupportService,
  ) {
  }

  ngOnInit(): void {
    this.ticket = this.supportService.getTicketSupportInformation();
  }

  print(event: Event) {
    event.preventDefault();
    window.print();
  }
}
