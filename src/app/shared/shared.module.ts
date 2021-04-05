import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Modules
import {RouterModule} from '@angular/router';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {PrimeModule} from '../prime-module';
import {TranslateModule} from '@ngx-translate/core';

// Dashboard Components
import {FooterComponent} from './components/dashboard/footer/footer.component';
import {PerfilComponent} from './components/profile/perfil/perfil.component';
import {HeaderComponent} from './components/dashboard/header/header.component';
import {WelcomeComponent} from './components/dashboard/welcome/welcome.component';
import {EditComponent} from './components/profile/edit/edit.component';

// Components
import {ControlMaintenanceComponent} from './components/modules/maintenance/control-maintenance/control-maintenance.component';
import {CreateMaintenanceComponent} from './components/modules/maintenance/create-maintenance/create-maintenance.component';
import {DetailMaintenanceComponent} from './components/modules/maintenance/detail-maintenance/detail-maintenance.component';
import {TicketMaintenanceComponent} from './components/modules/maintenance/ticket-maintenance/ticket-maintenance.component';
import {CreateSupportComponent} from './components/modules/support/create-support/create-support.component';
import {TicketSupportComponent} from './components/modules/support/ticket-support/ticket-support.component';
import {ControlSupportComponent} from './components/modules/support/control-support/control-support.component';
import {DetailSupportComponent} from './components/modules/support/detail-support/detail-support.component';
import {TechtabComponent} from './components/modules/inventory/techtab/techtab.component';
import {ManageInventoryComponent} from './components/modules/inventory/manage-inventory/manage-inventory.component';
import {ImplementComponent} from './components/modules/inventory/implement/implement.component';
import {AddTechtabComponent} from './components/modules/inventory/add-techtab/add-techtab.component';
import {TicketComponent} from './components/modules/loans/ticket/ticket.component';
import {ControlLoansComponent} from './components/modules/loans/control-loans/control-loans.component';

// Errors Components
import {ErrorComponent} from './components/error/error.component';
import {UnauthorizedComponent} from './components/unauthorized/unauthorized.component';
import {AccordionModule} from 'primeng/accordion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    FooterComponent,
    PerfilComponent,
    HeaderComponent,
    WelcomeComponent,
    EditComponent,
    ErrorComponent,
    ControlLoansComponent,
    TicketComponent,
    CreateSupportComponent,
    TicketSupportComponent,
    DetailMaintenanceComponent,
    TicketMaintenanceComponent,
    CreateMaintenanceComponent,
    ControlMaintenanceComponent,
    ControlSupportComponent,
    DetailSupportComponent,
    TechtabComponent,
    ManageInventoryComponent,
    ImplementComponent,
    AddTechtabComponent,
    UnauthorizedComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PerfilComponent,
    WelcomeComponent,
    EditComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialFileInputModule,
    PrimeModule,
    FormsModule,
    TranslateModule,
    AccordionModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class SharedModule {
}
