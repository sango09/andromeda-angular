import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EditComponent} from './edit/edit.component';
import {PerfilComponent} from './perfil/perfil.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'editar/:id', component: EditComponent},
      {path: 'perfil/:id', component: PerfilComponent}
    ])
  ],
  exports: [RouterModule]
})

export class ProfileRoutingModule {
}
