/* Modulos */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

/* Components */
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { EspecializacionesComponent } from './gestionAcademica/especializaciones/especializaciones.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { CursosComponent } from './gestionAcademica/cursos/cursos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalEspecializacionComponent } from './gestionAcademica/especializaciones/modal-especializacion/modal-especializacion.component';
import { EditEspecializacionesComponent } from './gestionAcademica/especializaciones/edit-especializaciones/edit-especializaciones.component';
import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
   
    NopagefoundComponent,
    DashboardComponent,
    InicioComponent,
    EspecializacionesComponent,
    PagesComponent,
    CursosComponent,
    ModalEspecializacionComponent,
    EditEspecializacionesComponent
  ],
  exports: [
    NopagefoundComponent,
    DashboardComponent,
    InicioComponent,
    EspecializacionesComponent,
    PagesComponent,
    CursosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule,
    
  ]
})
export class PagesModule { }
