import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AdminGuard} from './guards/admin.guard';
import {EmployeeGuard} from './guards/employee.guard';
import {AssistantGuard} from './guards/assistant.guard';
import {ErrorComponent} from './shared/components/error/error.component';
import {UnauthorizedComponent} from './shared/components/unauthorized/unauthorized.component';


const routes: Routes = [

  {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
  {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'admin', loadChildren: () => import('./roles/admin/admin.module').then(m => m.AdminModule), canLoad: [AdminGuard]},
  {path: 'empleado', loadChildren: () => import('./roles/empleado/empleado.module').then(m => m.EmpleadoModule), canLoad: [EmployeeGuard]},
  {path: 'auxiliar', loadChildren: () => import('./roles/auxiliar/auxiliar.module').then(m => m.AuxiliarModule), canLoad: [AssistantGuard]},
  {path: 'unauthorized', component: UnauthorizedComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    relativeLinkResolution: 'legacy',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
