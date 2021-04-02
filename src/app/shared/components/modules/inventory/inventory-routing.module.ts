import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AddTechtabComponent} from './add-techtab/add-techtab.component';
import {ImplementComponent} from './implement/implement.component';
import {ManageInventoryComponent} from './manage-inventory/manage-inventory.component';
import {TechtabComponent} from './techtab/techtab.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: '', component: ManageInventoryComponent},
      {path: 'agregar-implemento', component: ImplementComponent},
      {path: 'agregar-ficha', component: AddTechtabComponent},
      {path: 'ficha/:id', component: TechtabComponent}
    ])
  ],
  exports: []
})

export class InventoryRoutingModule {
}
