import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {RegistroComponent} from './components/registro/registro.component';
import {ReactiveFormsModule} from '@angular/forms';
import {VerifyComponent} from './components/verify/verify.component';
import {HomeModule} from '../home/home.module';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {SendEmailPasswordComponent} from './components/send-email-password/send-email-password.component';
import {DialogModule} from 'primeng/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {PrimeModule} from '../prime-module';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    VerifyComponent,
    ResetPasswordComponent,
    SendEmailPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HomeModule,
    DialogModule,
    TranslateModule,
    PrimeModule
  ]
})
export class AuthModule {
}
