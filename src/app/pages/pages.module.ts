/* Modulos */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


/* Components */
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { EspecializacionesComponent } from './gestionAcademica/especializaciones/especializaciones.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
   
    NopagefoundComponent,
    DashboardComponent,
    InicioComponent,
    EspecializacionesComponent,
    PagesComponent
  ],
  exports: [
    NopagefoundComponent,
    DashboardComponent,
    InicioComponent,
    EspecializacionesComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class PagesModule { }
