import {Component, OnInit} from '@angular/core';
import {TicketLoansService} from './ticketLoans.service';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
})


export class PersonalDataComponent implements OnInit {

  userData = JSON.parse(localStorage.getItem('userInfo'));
  userFullName = `${this.userData.first_name} ${this.userData.last_name}`;
  dates: Date;
  invalidDates: Array<Date>;
  data: any;
  value: Date;
  date: string;
  error: boolean;

  constructor(
    public ticketLoansService: TicketLoansService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    const today = new Date();
    const invalidDate = new Date();
    invalidDate.setDate(today.getDate() - 1);
    this.invalidDates = [invalidDate];
    this.data = this.ticketLoansService.getLoansInformation();
  }

  nextPage() {
    if (this.data.loans_location && this.value) {
      this.date = formatDate(this.value, 'yyyy-MM-dd HH:mm:ss', 'en-US');
      this.data.loans_date = this.date;
      this.ticketLoansService.loansInformation = this.data;
      const nextStep = this.router.createUrlTree(['../select_implement'], {relativeTo: this.route});
      this.router.navigateByUrl(nextStep);
      return;
    } else {
      this.error = true;
    }

  }

}
