import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EspecializacionesComponent } from './gestionAcademica/especializaciones/especializaciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { CursosComponent } from './gestionAcademica/cursos/cursos.component';
import { EditEspecializacionesComponent } from './gestionAcademica/especializaciones/edit-especializaciones/edit-especializaciones.component';
import { FormCursosComponent } from './gestionAcademica/cursos/form-cursos/form-cursos.component';
import { EmpleadosComponent } from './mantenimientos/empleados/empleados.component';
import { FormEmpleadoComponent } from './mantenimientos/empleados/form-empleado/form-empleado.component';
import { EstudiantesComponent } from './mantenimientos/estudiantes/estudiantes.component';
import { FormEstudiantesComponent } from './mantenimientos/estudiantes/form-estudiantes/form-estudiantes.component';
import { PeriodosComponent } from './gestionAcademica/periodos/periodos.component';
import { MatriculasComponent } from './operaciones/matriculas/matriculas.component';
import { DetallePeriodoComponent } from './gestionAcademica/periodos/detalle-periodo/detalle-periodo.component';
import { ListaMatriculasComponent } from './operaciones/lista-matriculas/lista-matriculas.component';
import { DetalleMatriculaComponent } from './operaciones/lista-matriculas/detalle-matricula/detalle-matricula.component';
import { PagosComponent } from './operaciones/pagos/pagos.component';
import { CronogramaPagosEstudianteComponent } from './operaciones/pagos/cronograma-pagos-estudiante/cronograma-pagos-estudiante.component';
import { RegisterPagoComponent } from './operaciones/pagos/cronograma-pagos-estudiante/register-pago/register-pago.component';


export const routes: Routes = [
    {
        path: 'sistema',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'especializaciones', component: EspecializacionesComponent, data: { titulo: 'Especializaciones' } },
            { path: 'matricular', component: MatriculasComponent, data: { titulo: 'Matricular Estudiante' } },
            { path: 'matriculas', component: ListaMatriculasComponent, data: { titulo: 'Matriculas' } },
            { path: 'pagos-inicio', component: PagosComponent, data: { titulo: 'Pagos - Inicio' } },
            { path: 'pagos-inicio/cronograma-pagos-estudiante/:dni', component: CronogramaPagosEstudianteComponent, data: { titulo: 'Cronograma de Pagos' } },
            { path: 'pagos-inicio/pagar', component: RegisterPagoComponent, data: { titulo: 'Cronograma de Pagos' } },
            { path: 'matriculas/detalle/:id', component: DetalleMatriculaComponent, data: { titulo: 'Detalle Matricula' } },
            { path: 'especializaciones/edit/:id', component: EditEspecializacionesComponent, data: { titulo: 'Formulario Especializaciones' } },
            { path: 'cursos/edit', component: FormCursosComponent, data: { titulo: 'Formulario Cursos' } },
            { path: 'cursos/edit/:id', component: FormCursosComponent, data: { titulo: 'Formulario Cursos' } },
            { path: 'periodos', component: PeriodosComponent, data: { titulo: 'Periodos' } },
            { path: 'periodos/detalle/:id', component: DetallePeriodoComponent, data: { titulo: 'Detalle de Periodo' } },
            { path: 'empleados', component: EmpleadosComponent, data: { titulo: 'Empleados' } },
            { path: 'empleados/form', component: FormEmpleadoComponent, data: { titulo: 'Formulario Empleados' } },
            { path: 'empleados/form/:id', component: FormEmpleadoComponent, data: { titulo: 'Formulario Empleados' } },
            { path: 'estudiantes', component: EstudiantesComponent, data: { titulo: 'Estudiantes' } },
            { path: 'estudiantes/form', component: FormEstudiantesComponent, data: { titulo: 'Formulario Estudiantes' } },
            { path: 'estudiantes/form/:id', component: FormEstudiantesComponent, data: { titulo: 'Formulario Estudiantes' } },
            { path: 'inicio', component: InicioComponent, data: { titulo: 'Inicio' } },
            { path: 'cursos', component: CursosComponent, data: { titulo: 'Cursos' } },
            { path: '', redirectTo: '/sistema/dashboard', pathMatch: 'full' },
        ]
    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }