import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EspecializacionesComponent } from './gestionAcademica/especializaciones/especializaciones.component';
import { InicioComponent } from './inicio/inicio.component';


export const routes: Routes = [
    {
        path: 'sistema',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'especializacions', component: EspecializacionesComponent },
            { path: 'inicio', component: InicioComponent },
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