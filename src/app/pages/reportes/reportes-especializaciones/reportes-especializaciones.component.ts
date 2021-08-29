import { Component, OnInit } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { map } from 'rxjs/operators';
import { Estado } from 'src/app/enums/estado';
import { Especializacion } from 'src/app/models/especializacion';
import { Periodo } from 'src/app/models/periodo';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EspecializacionService } from 'src/app/services/especializacion.service';
import { PeriodoService } from 'src/app/services/periodo.service';
import { resourceLimits } from 'worker_threads';
declare var $: any;
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ReportsService } from 'src/app/services/reports.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reportes-especializaciones',
  templateUrl: './reportes-especializaciones.component.html',
  styleUrls: ['./reportes-especializaciones.component.css']
})
export class ReportesEspecializacionesComponent implements OnInit {
  periodoSelected: Periodo = new Periodo();
  periodos: Periodo[] = [];
  data: any[] = [];
  public activos = 0;
  public inactivos = 0;
  colors: Color[] = [
    { backgroundColor: ['#55C7E1', '#1872D1', '#0E42D8', '#0ED864', '#75EEA9', '#113063', '#161163', '#9896AD', '#1C83B2', '#0027FF'] }
  ];
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = []
  public doughnutChartLabels2: Label[] = [];
  public doughnutChartData2: MultiDataSet = []
  public create = false;
  public especializaciones: Especializacion[] = [];
  constructor(
    private dashBoardService: DashboardService,
    private periodoS: PeriodoService,
    private espS: EspecializacionService,
    private reportS: ReportsService) { }

  ngOnInit(): void {
    this.getEspMostAll();
    this.getPeriodos();
    this.getEspecializaciones();
  }

  getPeriodos() {
    this.periodoS.listar()
      .pipe(
        map(res => {
          return res.filter(r => {
            return r.estado !== Estado.PENDIENTE
          })
        })
      )
      .subscribe(
        res => {
          this.periodos = res;
          this.periodoSelected = this.periodos.filter(p => {
            return p.estado === Estado.INSCRIPCION_ABIERTA || p.estado === Estado.ACTIVO;
          })[0];
          this.setPeriodoSeleccionado();
        }
      )
  }

  getEspecializaciones() {
    this.espS.listar().subscribe(
      res => {
        this.especializaciones = res;
        this.createDataTable();
        this.especializaciones.forEach(esp => {
          if (esp.estado === Estado.ACTIVO) {
            this.activos += 1;
          }
          if (esp.estado === Estado.INACTIVO) {
            this.inactivos += 1;
          }
        })
      }
    )
  }

  setPeriodoSeleccionado() {
    this.doughnutChartData2 = [];
    this.doughnutChartLabels2 = [];
    this.dashBoardService.getEspecializacionMasMatriculada(this.periodoSelected.id).subscribe(
      (res: any) => {
        res.forEach((r: any) => {
          this.doughnutChartData2.push(r.nveces);
          this.doughnutChartLabels2.push(r.nombre);
        });
        this.create = true;
      }

    )
  }

  getEspMostAll() {
    this.dashBoardService.getEspecializacionMasMatriculada(null).subscribe(
      res => {
        this.data = res;
        this.setData();
      }
    )
  }
  setData() {
    this.data.forEach(data => {
      this.doughnutChartLabels.push(data.nombre);
      this.doughnutChartData.push(data.nveces);
    })
  }


  generatePDF() {
    // printDiv is the html element which has to be converted to PDF
    let grafico: any = document.querySelector("#print-section");
    html2canvas(grafico).then(canvas => {
      let width = canvas.width;
      let height = canvas.height;
      console.log(canvas);
      console.log(grafico);
      console.log(width);
      console.log(height);
      var pdfFile = new jsPDF('p', 'pt', [width, height]);
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdfFile.addImage(imgData, 0, 0, width - width / 2, height - height / 2);
      pdfFile.save('sample.pdf');
    });
  }




  createDataTable() {

    $(function () {
      $("#estudiantes").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#estudiantes_wrapper .col-md-6:eq(0)');
      /*    
         $('#example1').dataTable().fnClearTable();
         $('#example1').dataTable().fnDestroy(); */

    });

  }

  deleteTable() {
    $('#estudiantes').dataTable().fnDestroy();
  }
}
