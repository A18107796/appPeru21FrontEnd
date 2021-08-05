import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Matricula } from 'src/app/models/matricula';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ReportsService } from 'src/app/services/reports.service';
import { Estado } from 'src/app/enums/estado';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
declare var $: any;

@Component({
  selector: 'app-lista-matriculas',
  templateUrl: './lista-matriculas.component.html',
  styleUrls: ['./lista-matriculas.component.css']
})
export class ListaMatriculasComponent implements OnInit {
  matriculas: Matricula[] = [];
  public cargando = false;
  public all = Estado.ALL;
  public pendiente = Estado.PENDIENTE;
  public activo = Estado.ACTIVO;
  public anulado = Estado.ANULADO;
  constructor(private matriculaService: MatriculaService, private reportService: ReportsService,
    private toastService: ToastrService) { }

  ngOnInit(): void {
    this.listar(Estado.ALL);
  }

  listar(estado: Estado) {
    if (estado = Estado.ALL) {
      this.matriculas = [];
      this.matriculaService.getMatriculas().subscribe(
        res => {
          this.deleteTable();
          this.cargando = true;
          setTimeout(() => {
            this.matriculas = res;
            this.cargando = false;
            this.createDataTable();
          }, 200);

        }
      )
    } else {
      this.matriculas = [];
      this.matriculaService.getByStatus(estado).subscribe(
        res => {
          this.deleteTable();
          this.cargando = true;
          setTimeout(() => {
            this.matriculas = res;
            this.cargando = false;
            this.createDataTable();
          }, 200);
        }
      )
    }

  }

  findMatricula(id: Number) {
    this.matriculaService.getEntity(id).subscribe(
      res => {
        this.generatePDF(res.matricula);
      }
    )
  }
  createDataTable() {
    $(function () {
      $("#ex1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "order": [[0, 'desc']]
      }).buttons().container().appendTo('#ex1_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });
  }

  generatePDF(matricula: Matricula) {
    console.log("Generando");
    let docDefinition = this.reportService.getFichaMatriculaPDF(matricula);
    let pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
  }


  deleteTable() {
    $('#ex1').dataTable().fnDestroy();
  }

}
