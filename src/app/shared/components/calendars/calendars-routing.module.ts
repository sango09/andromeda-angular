import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {GeneralComponent} from './general/general.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: GeneralComponent}
    ]),
  ],
  exports: [RouterModule]
})

export class CalendarsRoutingModule {
}
