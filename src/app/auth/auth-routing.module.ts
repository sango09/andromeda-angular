import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {RegistroComponent} from './components/registro/registro.component';
import {VerifyComponent} from './components/verify/verify.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {SendEmailPasswordComponent} from './components/send-email-password/send-email-password.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistroComponent},
  {path: 'verify', component: VerifyComponent},
  {path: 'password/reset', component: SendEmailPasswordComponent},
  {path: 'password/reset/confirm', component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
