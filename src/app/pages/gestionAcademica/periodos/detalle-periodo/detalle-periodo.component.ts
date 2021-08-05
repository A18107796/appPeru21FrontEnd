import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Periodo } from 'src/app/models/periodo';
import { PeriodoService } from 'src/app/services/periodo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-periodo',
  templateUrl: './detalle-periodo.component.html',
  styleUrls: ['./detalle-periodo.component.css']
})
export class DetallePeriodoComponent implements OnInit {
  public periodo: Periodo = new Periodo();
  constructor(
    private periodoService: PeriodoService,
    private locationService: Location,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listarPeriodo();
  }


  listarPeriodo() {
    this.activatedRouter.params.subscribe(params => {
      let id = params['id'];
      if (id && id > 0) {
        this.periodoService.getEntity(id).subscribe(
          res => {
            this.periodo = res.periodo;
          },
          err => {
            Swal.fire('Error', err.error.message, 'error');
          }
        )
      }
    })
  }

}
