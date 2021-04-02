import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NavComponent} from './components/nav/nav.component';
import {SharedModule} from '../../shared/shared.module';
import {EmpleadoRoutingModule} from './empleado-routing.module';
import {ChartModule} from 'primeng/chart';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {PrimeModule} from '../../prime-module';


@NgModule({
  declarations: [
    DashboardComponent,
    NavComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        EmpleadoRoutingModule,
        ChartModule,
        TranslateModule,
        PrimeModule
    ]
})
export class EmpleadoModule {
}
