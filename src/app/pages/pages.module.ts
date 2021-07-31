/* Modulos */
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { FormCursosComponent } from './gestionAcademica/cursos/form-cursos/form-cursos.component';
import { ModalCursosEspecializacionesComponent } from './gestionAcademica/especializaciones/edit-especializaciones/modal-cursos-especializaciones/modal-cursos-especializaciones.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { FormEmpleadoComponent } from './mantenimientos/empleados/form-empleado/form-empleado.component';
import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';
import { FormEstudiantesComponent } from './mantenimientos/estudiantes/form-estudiantes/form-estudiantes.component';
import { PeriodosComponent } from './gestionAcademica/periodos/periodos.component';
import { ModalCreatePeriodoComponent } from './gestionAcademica/periodos/modal-create-periodo/modal-create-periodo.component';
import { MatriculasComponent } from './operaciones/matriculas/matriculas.component';
import { ModalEstudiantesComponent } from './operaciones/matriculas/modal-estudiantes/modal-estudiantes.component';
import { FiltroPipe } from '../pipes/filtro.pipe';



@NgModule({
  declarations: [
   
    NopagefoundComponent,
    DashboardComponent,
    InicioComponent,
    EspecializacionesComponent,
    PagesComponent,
    CursosComponent,
    ModalEspecializacionComponent,
    EditEspecializacionesComponent,
    FormCursosComponent,
    ModalCursosEspecializacionesComponent,
    EmpleadosComponent,
    FormEmpleadoComponent,
    EstudiantesComponent,
    FormEstudiantesComponent,
    PeriodosComponent,
    ModalCreatePeriodoComponent,
    MatriculasComponent,
    ModalEstudiantesComponent,
    FiltroPipe
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
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule,
    BrowserAnimationsModule
    
  ],
  providers:[
    DatePipe
  ]

})
export class PagesModule { }
