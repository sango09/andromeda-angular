import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ControlSupportComponent} from './control-support/control-support.component';
import {CreateSupportComponent} from './create-support/create-support.component';
import {DetailSupportComponent} from './detail-support/detail-support.component';
import {TicketSupportComponent} from './ticket-support/ticket-support.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'control', component: ControlSupportComponent},
      {path: 'solicitar', component: CreateSupportComponent},
      {path: 'detalle/:id', component: DetailSupportComponent},
      {path: 'ticket', component: TicketSupportComponent}
    ])
  ],
  exports: [RouterModule]
})

export class SupportRoutingModule {
}
