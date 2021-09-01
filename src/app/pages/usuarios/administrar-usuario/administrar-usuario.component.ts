import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stat } from 'fs';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrar-usuario',
  templateUrl: './administrar-usuario.component.html',
  styleUrls: ['./administrar-usuario.component.css']
})
export class AdministrarUsuarioComponent implements OnInit {
  public roles: Rol[] = [];
  public usuario: Usuario = new Usuario();
  public cargando = false;
  constructor(private usuarioService: UsuarioService, private router: Router, private activatedR: ActivatedRoute, private toastS: ToastrService) { }

  ngOnInit(): void {
    this.cargando = true;
    setTimeout(() => {
      this.getRoles();
      this.getUsuario();
    }, 400);
  }

  getUsuario() {
    this.activatedR.params.subscribe(params => {
      let id = params['id'];
      if (id && id > 0) {
        this.usuarioService.getEntity(id).subscribe(
          res => {
            this.usuario = res.usuario;
            this.cargando = false;
          },
          err => {
            this.router.navigateByUrl('/sistema/usuarios');
          })
      } else {
        this.router.navigateByUrl('/sistema/usuarios');
      }
    })
  }

  getRoles() {
    this.usuarioService.getRoles().pipe(
      map(response => {
        return response.filter(r => r.nombre !== 'ROLE_ADMIN')
      })
    ).subscribe(res => this.roles = res);
  }

  hasRole(rol: string) {
    let status = false;
    this.usuario.roles.filter((r: any) => {
      if (r.nombre === rol) {
        status = true;
        return;
      }
    });
    return status;
  }

  setOption(obj: any, evt: any) {
    if (evt.target.checked) {
      this.usuario.roles.push(obj);
    } else {
      this.usuario.roles = this.usuario.roles.filter((rol: any) => {
        return rol.id !== obj.id;
      });
    }
  }

  save() {
    console.log(this.usuario.roles);
    let roles: any = this.usuario.roles;
    console.log(roles);
    this.cargando = true;
    this.toastS.info('Gurdando cambios..', 'Mensaje');
    setTimeout(() => {
      this.usuarioService.saveChanges(this.usuario.id, roles).subscribe(
        res => {
          this.toastS.success('Cambios guardados', 'OK');
          setTimeout(() => {
            window.location.reload();
          }, 500);
        },
        err => {
          Swal.fire('Error:', err.error.message, 'error');
          this.router.navigateByUrl('/sistema/usuarios');
        })
    }, 300);
  }



}
