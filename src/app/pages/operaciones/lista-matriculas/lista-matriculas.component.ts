import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Matricula } from 'src/app/models/matricula';
import { MatriculaService } from 'src/app/services/matricula.service';
import { ReportsService } from 'src/app/services/reports.service';
import { Estado } from 'src/app/enums/estado';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PeriodosComponent } from '../../gestionAcademica/periodos/periodos.component';
import { Periodo } from 'src/app/models/periodo';
import { Especializacion } from 'src/app/models/especializacion';
import { PeriodoService } from 'src/app/services/periodo.service';
import { map } from 'rxjs/operators';
import { EspecializacionService } from 'src/app/services/especializacion.service';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
  public periodos: Periodo[] = [];
  public especializaciones: Especializacion[] = [];
  public periodoSelected: Periodo = new Periodo();
  public idPeriodo = 0;


  constructor(private matriculaService: MatriculaService, private reportService: ReportsService,
    private toastService: ToastrService,
    private periodoService: PeriodoService,
    private especializacionService: EspecializacionService) { }

  ngOnInit(): void {
    this.listar(Estado.ALL);
    this.listarPeriodos();
  }

  mostrarTodo() {
    this.especializaciones = [];
    this.listarPeriodos();
    this.deleteTable();
    this.listar(Estado.ALL);
  }

  setEspecializaciones(event: any) {
    let id = event.target.value;
    this.matriculas = [];
    if (id > 0) {
      this.matriculas = [];
      this.deleteTable();
      this.cargando = true;
      this.matriculaService.getMatriculasByPeriodo(id).subscribe(
        matriculas => {
          setTimeout(() => {
            this.cargando = false;
            this.matriculas = matriculas;
            this.createDataTable();
          }, 100)
        }
      )
      this.especializacionService.getEspecializacionByPeriodo(id).subscribe(
        especializaciones => {
          this.idPeriodo = id;
          this.especializaciones = especializaciones;
        }
      )
    } else {
      console.log("Listando");

      this.idPeriodo = 0;
      this.matriculas = [];
      this.deleteTable();
      this.especializaciones = [];
      this.listar(Estado.ALL);
    }
  }

  findByEspecializacion(event: any) {
    let id = event?.target.value;
    if (id > 0) {
      if (this.idPeriodo > 0) {
        this.matriculas = [];
        this.deleteTable();
        this.cargando = true;
        this.matriculaService.getMatriculasByPeriodoAndEspecializacion(this.idPeriodo, id).subscribe(
          matriculas => {
            setTimeout(() => {
              this.cargando = false;
              this.matriculas = matriculas;
              this.createDataTable();
            }, 100)
          }
        )
      }
    } else {
      this.matriculas = [];
      this.deleteTable();
      this.cargando = true;
      this.matriculaService.getMatriculasByPeriodo(this.idPeriodo).subscribe(
        matriculas => {
          setTimeout(() => {
            this.cargando = false;
            this.matriculas = matriculas;
            this.createDataTable();
          }, 100)
        }
      )
    }
  }

  listarPeriodos() {
    this.periodoService.listar().pipe(
      map(p => {
        return p.filter(p2 => p2.estado !== Estado.PENDIENTE);
      })
    ).subscribe(res => {
      this.periodos = res;
    });
  }

  listar(estado: Estado) {
    this.matriculas = [];
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
        "responsive": false, "lengthChange": false, "autoWidth": false,
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
