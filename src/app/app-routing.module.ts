import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './components/clients/clients.component';
import {ComptesComponent} from './components/comptes/comptes.component';


const routes: Routes = [
  { path: 'clients', component: ClientsComponent},
  { path: 'comptes', component: ComptesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
