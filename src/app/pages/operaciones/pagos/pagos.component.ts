import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Estado } from 'src/app/enums/estado';
import { Matricula } from 'src/app/models/matricula';
import { Pago } from 'src/app/models/pago';
import { MatriculaService } from 'src/app/services/matricula.service';
import { PagoService } from 'src/app/services/pago.service';
import Swal from 'sweetalert2';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportsService } from 'src/app/services/reports.service';
import { FactoryOrValue } from 'rxjs';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
declare var $: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  public recentMatriculas: Matricula[] = [];
  public pagos: Pago[] = [];
  public dni: string = "";
  constructor(
    private matriculaService: MatriculaService,
    private router: Router, private toastService: ToastrService,
    public pagoService: PagoService,
    private reportService: ReportsService) {

  }

  ngOnInit(): void {
    this.getRecentMatriculas();
    this.getPagos();
  }

  getRecentMatriculas() {
    this.matriculaService.listar().pipe(
      map((res: any) => res.sort((a: any, b: any) => b.id - a.id))
    ).subscribe(res => {
      this.recentMatriculas = res;
      if (this.recentMatriculas.length > 0) {
        this.createDataTable();
      }

    });
  }

  getPagos() {
    this.pagoService.listar().subscribe(
      res => {
        this.pagos = res;
        this.createDataTable2();
      }
    )
  }

  submit() {
    if (this.dni.length > 7 && this.dni.length < 12) {
      this.router.navigate(['/sistema/pagos-inicio/cronograma-pagos-estudiante', this.dni]);
    } else {
      Swal.fire('Mensaje', 'Ingrese un numero de documento valido.', 'error')
    }

  }

  createDataTable() {

    $(function () {
      $("#ex1").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false, "pageLength": 3,
        "order": [[0, 'desc']]
      }).buttons().container().appendTo('#ex1_wrapper .col-md-6:eq(0)');


    });

  }

  createDataTable2(){
    $(function () {
      $("#ex2").DataTable({
        "responsive": false, "lengthChange": false, "autoWidth": false, "pageLength": 3,
        "order": [[0, 'desc']]
      }).buttons().container().appendTo('#ex1_wrapper .col-md-6:eq(0)');


    });

  }

  deleteTable() {
    $('#ex1').dataTable().fnDestroy();
  }

  generatePDF(factura: Pago) {
    this.toastService.info('Generando PDF...', 'Generando');
    setTimeout(() => {
      if (factura) {
        let docDefinition = this.reportService.getFacturaPDF(factura);
        let pdf = pdfMake.createPdf(docDefinition);
        pdf.open();
        this.toastService.success('Listo', 'PDF Generado');
      } else {
        this.toastService.error('Error', 'Ocurrio un error, intentelo denuevo');
      }
    }, 900);
  }

}
