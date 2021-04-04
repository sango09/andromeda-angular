import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from './components/nav/nav.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from '../../shared/shared.module';
import {AuxiliarRoutingModule} from './auxiliar-routing.module';
import {ChartModule} from 'primeng/chart';
import {PrimeModule} from '../../prime-module';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    NavComponent,
    DashboardComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        AuxiliarRoutingModule,
        ChartModule,
        PrimeModule,
        TranslateModule,
        FormsModule
    ]
})
export class AuxiliarModule { }
