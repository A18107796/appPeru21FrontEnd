import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { PagesRoutingModule } from './pages/pages.routing';


import { LoginComponent } from './auth/login/login.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { AuthRoutingModule } from './auth/auth.routing';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    /* RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}), */
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
