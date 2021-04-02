import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepsLoansRoutingModule} from './steps-loans-routing.module';

// Module
import {PrimeModule} from '../../../../../prime-module';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

// Components
import {StepsloansComponent} from './create-loans/stepsloans.component';
import {PersonalDataComponent} from './create-loans/personal-data.component';
import {SelectImplementComponent} from './create-loans/select-implement.component';
import {ExtraDataComponent} from './create-loans/extra-data.component';
import {TicketComponent} from './create-loans/ticket.component';

// Services
import {TicketLoansService} from './create-loans/ticketLoans.service';


@NgModule({
  declarations: [
    StepsloansComponent,
    PersonalDataComponent,
    SelectImplementComponent,
    ExtraDataComponent,
    TicketComponent],
  imports: [
    CommonModule,
    PrimeModule,
    StepsLoansRoutingModule,
    FormsModule,
    TranslateModule
  ],
  providers: [
    TicketLoansService
  ]
})
export class StepsLoansModule {
}
