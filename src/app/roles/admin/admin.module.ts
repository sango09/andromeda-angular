import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {NavComponent} from './components/nav/nav.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {UsersComponent} from './components/control_users/users/users.component';
import {AdminRoutingModule} from './admin-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PrimeModule} from '../../prime-module';
import {AssistantsComponent} from './components/assistants/assistants.component';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    NavComponent,
    DashboardComponent,
    UsersComponent,
    AssistantsComponent
  ]
  ,
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    PrimeModule,
    FormsModule,
    TranslateModule
  ]
})
export class AdminModule {
}
