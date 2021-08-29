import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/enums/estado';
import { Periodo } from 'src/app/models/periodo';
import { ModalPeriodoService } from 'src/app/services/modal-periodo.service';
import { ModalService } from 'src/app/services/modal.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import Swal from 'sweetalert2';
import { isUndefined } from 'util';
import { ListaMatriculasComponent } from '../../operaciones/lista-matriculas/lista-matriculas.component';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {
  periodos: Periodo[] = [];

  constructor(
    private router: Router,
    private _sPeriodo: PeriodoService,
    private modalService: ModalService,
    private modalPeriodo: ModalPeriodoService,
    private toastS: ToastrService) { }

  ngOnInit(): void {
    this.listar();
  }

  abrirModal() {
    if (this.periodos.length > 0) {
      const status = this.getEstado(this.periodos[0].fecha_fin)
      if (status == "EN PROCESO") {
        Swal.fire('Existe un periodo disponible, se espera a que culmine', '', 'info');
      } else {
        this.modalService.abrirModal();
      }
    } else {
      this.modalService.abrirModal();
    }

  }

  abrirModalAlerts() {
    this.modalPeriodo.abrirModal();
  }

  redirigirDetalle(id: number) {
    this.router.navigateByUrl("/sistema/periodos/detalle/" + id);
  }

  sincronizar() {
    this._sPeriodo.sincronizar().subscribe(
      res => {
        console.log(res);
        this.toastS.success('OK', '');
        this.listar();
      },
      err => {
        console.log(err);
      }

    )
  }



  getEstado(fecha_fin: Date): string {
    const now = new Date().getTime();
    const fin = new Date(fecha_fin).getTime();



    if (now > fin) {
      return "CULMINADA";
    } else {
      return "EN PROCESO";
    }
  }

  listar() {
    this._sPeriodo.listar().subscribe(
      res => {
        const lista: Periodo[] = res;
        let cont = 0;
        lista.forEach(p => {
          if (p.estado == Estado.INSCRIPCION_ABIERTA) {
            cont += 1;
          }
        })
        if (cont > 1) {
          Swal.fire({
            title: 'Mensaje',
            text: 'Existe dos periodo en estado de inscripción\n Tiene que sincronizar las fechas',
            icon: 'info',
            showConfirmButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `Revisar`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.sincronizar();
            }
          })
        } else if (cont === 0) {
          this.periodos = res;
          this.checkPeriodo();
        } else {
          this.periodos = res;
        }
      }
    )
  }

  checkPeriodo() {
    this._sPeriodo.checkPeriodo().subscribe(
      res => {
        if (res) {
          Swal.fire({
            title: 'Mensaje',
            text: 'Existe un periodo para entrar en estado de inscripción\n ¿Desea cambiar estado?',
            icon: 'info',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `Revisar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this._sPeriodo.updateEstado(res.id, Estado.INSCRIPCION_ABIERTA).subscribe(
                res => {
                  Swal.fire('Listo', 'Se actualizo el calendario academico, las inscripciones estan abiertas', 'success');
                  window.location.reload();

                },
                err => {
                  Swal.fire('Error', 'Ocurrio un error, intentelo denuevo :(', 'error');

                }
              );
            } else if (result.isDenied) {
              this.redirigirDetalle(res.id);

            }
          })
        }
      },
      err => {
        console.log(err);

      }
    )
  }

}
