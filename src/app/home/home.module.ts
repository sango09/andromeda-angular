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
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';



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
    TranslateModule
  ]
})
export class HomeModule {
}
