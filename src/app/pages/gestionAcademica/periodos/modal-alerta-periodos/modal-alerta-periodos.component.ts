import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Estado } from 'src/app/enums/estado';
import { Periodo } from 'src/app/models/periodo';
import { ModalPeriodoService } from 'src/app/services/modal-periodo.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import Swal from 'sweetalert2';
import { PeriodosComponent } from '../periodos.component';

@Component({
  selector: 'app-modal-alerta-periodos',
  templateUrl: './modal-alerta-periodos.component.html',
  styleUrls: ['./modal-alerta-periodos.component.css']
})
export class ModalAlertaPeriodosComponent implements OnInit {
  public periodos: Periodo[] = [];
  public fecha_hoy: Date = new Date();
  public activo = Estado.ACTIVO;
  public pendiente = Estado.PENDIENTE;
  public inscripcion_abierta = Estado.INSCRIPCION_ABIERTA;
  constructor(
    public modalService: ModalPeriodoService,
    private periodoService: PeriodoService,
    private toastS: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPeriodosPasados();
  }

  getPeriodosPasados() {
    this.periodoService.checkPreviusPeriodos(Estado.INSCRIPCION_ABIERTA).subscribe(
      res => {
        this.periodos = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  getPeriodosParaActivarCercanos(){

  }

  actualizarInformacion(id: number, estado: Estado) {
    this.periodoService.updateEstado(id, estado).subscribe(
      res => {
        console.log(res);
        Swal.fire({
          title: 'Estado Actualizado',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Hecho'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      },
      err => {
        console.log(err);
      }
    )
  }

  cerrar() {
    this.modalService.cerrarModal();
  }

}
