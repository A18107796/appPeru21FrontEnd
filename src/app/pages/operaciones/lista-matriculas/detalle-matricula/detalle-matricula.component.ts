import { Location } from '@angular/common';
import { Component, OnInit, ɵSWITCH_IVY_ENABLED__POST_R3__ } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Matricula } from 'src/app/models/matricula';
import { MatriculaService } from 'src/app/services/matricula.service';
import Swal from 'sweetalert2';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportsService } from 'src/app/services/reports.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-detalle-matricula',
  templateUrl: './detalle-matricula.component.html',
  styleUrls: ['./detalle-matricula.component.css']
})
export class DetalleMatriculaComponent implements OnInit {
  public matricula: Matricula = new Matricula();
  public cargando = false;
  constructor(private matriculaService: MatriculaService, private toastService: ToastrService, private activatedRoute: ActivatedRoute,
    public location: Location, private router: Router, private reportService: ReportsService) { }

  ngOnInit(): void {
    this.getMatricula();
  }

  getMatricula() {
    this.activatedRoute.params.subscribe(
      params => {
        let id = params['id'];
        if (id && id > 0) {
          this.cargando = true
          setTimeout(() => {
            this.matriculaService.getEntity(id).subscribe(
              res => {
                this.matricula = res.matricula;
                this.cargando = false;
              },
              err => {
                Swal.fire("Error", err.error.message, 'error');
                this.router.navigateByUrl('/sistema/matriculas')
              }
            )
          }, 1000);
        } else {
          this.location.back();
        }
      }
    )
  }

  generatePDF() {
    this.toastService.info('Generando PDF...', 'Generando');
    setTimeout(() => {
      if (this.matricula) {
        let docDefinition = this.reportService.getFichaMatriculaPDF(this.matricula);
        let pdf = pdfMake.createPdf(docDefinition);
        pdf.open();
        this.toastService.success('Listo','PDF Generado');
      } else {
        this.toastService.error('Error', 'Ocurrio un error, intentelo denuevo');
      }


    }, 900);
  }

}
