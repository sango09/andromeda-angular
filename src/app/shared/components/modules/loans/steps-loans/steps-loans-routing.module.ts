import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PersonalDataComponent} from './create-loans/personal-data.component';
import {TicketComponent} from './create-loans/ticket.component';
import {ExtraDataComponent} from './create-loans/extra-data.component';
import {SelectImplementComponent} from './create-loans/select-implement.component';
import {StepsloansComponent} from './create-loans/stepsloans.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '', component: StepsloansComponent, children: [
          {path: '', redirectTo: 'data', pathMatch: 'full'},
          {path: 'data', component: PersonalDataComponent},
          {path: 'ticket', component: TicketComponent},
          {path: 'extra_data', component: ExtraDataComponent},
          {path: 'select_implement', component: SelectImplementComponent}
        ]
      }
    ]),
  ],
  exports: [
    RouterModule
  ]
})

export class StepsLoansRoutingModule {}
