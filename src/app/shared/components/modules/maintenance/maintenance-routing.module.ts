import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CreateMaintenanceComponent} from './create-maintenance/create-maintenance.component';
import {TicketMaintenanceComponent} from './ticket-maintenance/ticket-maintenance.component';
import {ControlMaintenanceComponent} from './control-maintenance/control-maintenance.component';
import {DetailMaintenanceComponent} from './detail-maintenance/detail-maintenance.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'solicitar', component: CreateMaintenanceComponent},
      {path: 'ticket', component: TicketMaintenanceComponent},
      {path: 'control', component: ControlMaintenanceComponent},
      {path: 'detalle/:id', component: DetailMaintenanceComponent},
    ])
  ],
  exports: [RouterModule]
})

export class MaintenanceRoutingModule {
}
