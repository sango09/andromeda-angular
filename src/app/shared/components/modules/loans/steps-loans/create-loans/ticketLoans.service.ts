import {Injectable} from '@angular/core';

@Injectable()
export class TicketLoansService {

  loansInformation = {
    loans_location: '',
    loans_date: '',
    comments: '',
    implement: null,
    ammount_implements: null,
    implements_available: null,
  };

  ticketInformation = {
    id: '',
    ammount_implements: null,
    assigned_auxiliary: '',
    loans_location: '',
    loans_date: '',
    comments: '',
    implement: null
  };


  constructor() {
  }

  getLoansInformation() {
    return this.loansInformation;
  }

  getTicketLoansInformation() {
    return this.ticketInformation;
  }
}
