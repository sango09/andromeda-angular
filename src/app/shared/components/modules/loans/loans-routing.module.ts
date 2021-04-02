import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TicketComponent} from './ticket/ticket.component';
import {ControlLoansComponent} from './control-loans/control-loans.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'solicitar', loadChildren: () => import('./steps-loans/steps-loans.module').then(m => m.StepsLoansModule)},
      {path: 'detalle/:id', component: TicketComponent},
      {path: 'control', component: ControlLoansComponent}
    ])
  ],
  exports: [RouterModule]
})


export class LoansRoutingModule {
}
