import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Periodo } from 'src/app/models/periodo';
import { ModalService } from 'src/app/services/modal.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-periodos',
  templateUrl: './periodos.component.html',
  styleUrls: ['./periodos.component.css']
})
export class PeriodosComponent implements OnInit {
  periodos: Periodo[] = [];

  constructor(private router: Router, private _sPeriodo: PeriodoService, private modalService: ModalService) { }

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
        this.periodos = res;
      }
    )
  }

}
