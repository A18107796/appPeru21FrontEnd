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
import { AnularPagoComponent } from './operaciones/pagos/anular-pago/anular-pago.component';
import { PagoDetalle } from '../models/pago-detalle';
import { DetallePagoComponent } from './operaciones/pagos/detalle-pago/detalle-pago.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReportsService } from '../services/reports.service';
import { ReportesGananciasComponent } from './reportes/reportes-ganancias/reportes-ganancias.component';
import { ReportesEspecializacionesComponent } from './reportes/reportes-especializaciones/reportes-especializaciones.component';
import { RoleGuard } from '../guards/role.guard';
import { AdministrarUsuarioComponent } from './usuarios/administrar-usuario/administrar-usuario.component';
import { SearchComponent } from './search/search.component';


export const routes: Routes = [
    {
        path: 'sistema',
        component: PagesComponent,
        children: [
            {
                path: 'dashboard', component: DashboardComponent, data:
                    { data: 'ROLE_EMPLEADO', titulo: 'Dashboard' },
                canActivate: [RoleGuard]
            },
            {
                path: 'especializaciones', component: EspecializacionesComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Especializaciones' },
                canActivate: [RoleGuard]
            },
            {
                path: 'matricular', component: MatriculasComponent, data:
                    { data: 'ROLE_SECRETARIA', titulo: 'Matricular Estudiante' },
                canActivate: [RoleGuard]
            },
            {
                path: 'matriculas', component: ListaMatriculasComponent, data:
                    { data: 'ROLE_SECRETARIA', titulo: 'Matriculas' },
                canActivate: [RoleGuard]
            },
            {
                path: 'anular-pagos', component: AnularPagoComponent, data:
                    { data: 'ROLE_CAJA', titulo: 'Pagos - Anular' },
                canActivate: [RoleGuard]
            },
            {
                path: 'pagos-inicio', component: PagosComponent, data:
                    { data: 'ROLE_CAJA', titulo: 'Pagos - Inicio' },
                canActivate: [RoleGuard]
            },
            {
                path: 'pagos-inicio/detalle/:id', component: DetallePagoComponent, data:
                    { data: 'ROLE_CAJA', titulo: 'Pago Detalle' },
                canActivate: [RoleGuard]
            },
            {
                path: 'pagos-inicio/cronograma-pagos-estudiante/:dni', component: CronogramaPagosEstudianteComponent, data:
                    { data: 'ROLE_CAJA', titulo: 'Cronograma de Pagos' },
                canActivate: [RoleGuard]
            },
            {
                path: 'pagos-inicio/pagar', component: RegisterPagoComponent, data:
                    { data: 'ROLE_CAJA', titulo: 'Registrar Pago' },
                canActivate: [RoleGuard]
            },
            {
                path: 'matriculas/detalle/:id', component: DetalleMatriculaComponent, data:
                    { data: 'ROLE_SECRETARIA', titulo: 'Detalle Matricula' },
                canActivate: [RoleGuard]
            },
            {
                path: 'especializaciones/edit/:id', component: EditEspecializacionesComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Formulario Especializaciones' },
                canActivate: [RoleGuard]
            },
            {
                path: 'cursos/edit', component: FormCursosComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Formulario Cursos' },
                canActivate: [RoleGuard]
            },
            {
                path: 'cursos/edit/:id', component: FormCursosComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Formulario Cursos' },
                canActivate: [RoleGuard]
            },
            {
                path: 'periodos', component: PeriodosComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Periodos' },
                canActivate: [RoleGuard]
            },
            {
                path: 'periodos/detalle/:id', component: DetallePeriodoComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Detalle de Periodo' },
                canActivate: [RoleGuard]
            },
            {
                path: 'empleados', component: EmpleadosComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Empleados' },
                canActivate: [RoleGuard]
            },
            {
                path: 'empleados/form', component: FormEmpleadoComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Formulario Empleados' },
                canActivate: [RoleGuard]
            },
            {
                path: 'empleados/form/:id', component: FormEmpleadoComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Formulario Empleados' },
                canActivate: [RoleGuard]
            },
            {
                path: 'estudiantes', component: EstudiantesComponent, data:
                    { data: 'ROLE_INFORMES', titulo: 'Estudiantes' },
                canActivate: [RoleGuard]
            },
            {
                path: 'estudiantes/form', component: FormEstudiantesComponent, data:
                    { data: 'ROLE_INFORMES', titulo: 'Formulario Estudiantes' },
                canActivate: [RoleGuard]
            },
            {
                path: 'estudiantes/form/:id', component: FormEstudiantesComponent, data:
                    { data: 'ROLE_INFORMES', titulo: 'Formulario Estudiantes' },
                canActivate: [RoleGuard]
            },
            {
                path: 'inicio', component: InicioComponent, data:
                    { data: 'ROLE_EMPLEADO', titulo: 'Inicio' },
                canActivate: [RoleGuard]
            },
            {
                path: 'cursos', component: CursosComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Cursos' },
                canActivate: [RoleGuard]
            },
            {
                path: 'usuarios', component: UsuariosComponent, data:
                    { data: 'ROLE_ADMIN', titulo: 'Usuarios' },
                canActivate: [RoleGuard]
            },
            {
                path: 'usuarios/administrar/:id', component: AdministrarUsuarioComponent, data:
                    { data: 'ROLE_ADMIN', titulo: 'Administrar Usuario' },
                canActivate: [RoleGuard]
            },
            {
                path: 'reportes-ganancias', component: ReportesGananciasComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Reportes Ganancias' },
                canActivate: [RoleGuard]
            },
            {
                path: 'reportes-especializaciones', component: ReportesEspecializacionesComponent, data:
                    { data: 'ROLE_CORDINACIONACADEMICA', titulo: 'Reportes Especializaciones' },
                canActivate: [RoleGuard]
            },
            {
                path: 'buscar/:term', component: SearchComponent, data:
                    { data: 'ROLE_EMPLEADO', titulo: 'Buscar' },
                canActivate: [RoleGuard]
            },
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