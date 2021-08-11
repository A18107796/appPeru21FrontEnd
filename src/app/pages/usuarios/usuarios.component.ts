import { Component, OnInit } from '@angular/core';
import { stat } from 'fs';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[] = []
  constructor(private usuarioService: UsuarioService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.usuarioService.listar().subscribe(
      res => {
        this.usuarios = res;
      }
    )
  }

  updateStado(id: number, status: boolean) {
    this.toastService.info("Actualizando Rol..");
    setTimeout(() => {
      this.usuarioService.cambiarEstado(id, status).subscribe(
        res => {
          this.toastService.success("Rol cambiado!");
          this.listar();
        },
        err => {
          this.toastService.error(err.error.message, 'Ops');
        }
      )
    }, 600);

  }



}
