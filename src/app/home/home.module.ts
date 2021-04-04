import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {ContactComponent} from './components/contact/contact.component';
import {FooterComponent} from './components/footer/footer.component';
import {ContentComponent} from './components/content/content.component';
import {RouterModule} from '@angular/router';
import {NgxTypedJsModule} from 'ngx-typed-js';
import {HomeComponent} from './components/home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {DropdownModule} from 'primeng/dropdown';
import {ScrollTopModule} from 'primeng/scrolltop';
import {ReactiveFormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    HeaderComponent,
    ContactComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent
  ],
  exports: [
    HeaderComponent,
    ContactComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxTypedJsModule,
    HomeRoutingModule,
    TranslateModule,
    DropdownModule,
    ScrollTopModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ]
})
export class HomeModule {
}
