import {ErrorComponent} from '../../shared/components/error/error.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NavComponent} from './components/nav/nav.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {EmployeeGuard} from '../../guards/employee.guard';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: '', loadChildren: () => import('../../shared/components/profile/profile.module').then(m => m.ProfileModule)},
      {path: 'calendario', loadChildren: () => import('../../shared/components/calendars/calendars.module').then(m => m.CalendarsModule)},
      {
        path: 'servicio',
        children: [
          {
            path: 'prestamos',
            loadChildren: () => import('../../shared/components/modules/loans/loans.module').then(m => m.LoansModule)
          },
          {
            path: 'soporte-tecnico',
            loadChildren: () => import('../../shared/components/modules/support/support.module').then(m => m.SupportModule)
          }
        ]
      },
    ],
  },
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EmpleadoRoutingModule {
}
