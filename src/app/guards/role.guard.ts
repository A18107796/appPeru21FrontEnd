import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { routes } from '../pages/pages.routing';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let role = route.data['data'] as string;
      console.log(this.authService.hasRole(role));
    
    if (!this.authService.hasRole(role)) {
      Swal.fire('Acceso denegado', 'No tienes acceso a este recurso!!', 'warning');
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }


  }




}


