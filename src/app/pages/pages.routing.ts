import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EspecializacionesComponent } from './gestionAcademica/especializaciones/especializaciones.component';
import { InicioComponent } from './inicio/inicio.component';
import { CursosComponent } from './gestionAcademica/cursos/cursos.component';
import { EditEspecializacionesComponent } from './gestionAcademica/especializaciones/edit-especializaciones/edit-especializaciones.component';
import { FormCursosComponent } from './gestionAcademica/cursos/form-cursos/form-cursos.component';


export const routes: Routes = [
    {
        path: 'sistema',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'especializaciones', component: EspecializacionesComponent },
            { path: 'especializaciones/edit/:id', component: EditEspecializacionesComponent },
            { path: 'cursos/edit', component: FormCursosComponent },
            { path: 'cursos/edit/:id', component: FormCursosComponent },
            { path: 'inicio', component: InicioComponent },
            { path: 'cursos', component: CursosComponent },
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