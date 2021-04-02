import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UsersComponent} from './components/control_users/users/users.component';
import {AssistantsComponent} from './components/assistants/assistants.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'usuarios', component: UsersComponent},
      {path: 'auxiliares', component: AssistantsComponent},
      {
        path: 'inventario',
        loadChildren: () => import('../../shared/components/modules/inventory/inventory.module').then(m => m.InventoryModule)
      },
      {
        path: 'calendario',
        loadChildren: () => import('../../shared/components/calendars/calendars.module').then(m => m.CalendarsModule)
      },
      {
        path: '',
        loadChildren: () => import('../../shared/components/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'servicio',
        children: [
          {
            path: 'prestamos',
            loadChildren: () => import('../../shared/components/modules/loans/loans.module').then(m => m.LoansModule)
          },
          {
            path: 'mantenimiento',
            loadChildren: () => import('../../shared/components/modules/maintenance/maintenance.module').then(m => m.MaintenanceModule)
          },
          {
            path: 'soporte-tecnico',
            loadChildren: () => import('../../shared/components/modules/support/support.module').then(m => m.SupportModule)
          }
        ]
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}
