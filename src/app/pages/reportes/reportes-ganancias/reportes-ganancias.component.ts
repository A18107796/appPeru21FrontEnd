import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { Periodo } from 'src/app/models/periodo';
import { DashboardService } from 'src/app/services/dashboard.service';
import { PeriodoService } from 'src/app/services/periodo.service';

@Component({
  selector: 'app-reportes-ganancias',
  templateUrl: './reportes-ganancias.component.html',
  styleUrls: ['./reportes-ganancias.component.css']
})
export class ReportesGananciasComponent implements OnInit {
  public fecha_inincio!: Date;
  public fecha_fin!: Date;
  public total = 0.0;
  public totalFiltrado = 0.0;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['TOTAL', 'FILTRADO'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];

  constructor(private dashBoardService: DashboardService, private periodoS: PeriodoService) { }

  ngOnInit(): void {
    this.dashBoardService.getGanancias().subscribe(
      total => {
        this.total = total.ganancias;
        this.barChartData.push({ data:[this.total, this.totalFiltrado], label: 'GANANCIAS' });
      }
    )
  }

  filtrar() {

    if (this.fecha_fin && this.fecha_inincio) {
      let dateInicioString = this.fecha_inincio.toString();
      let dateFinStrig = this.fecha_fin.toString();
      this.dashBoardService.getGananciasByFechas(dateInicioString, dateFinStrig).subscribe(
        res => {
          this.totalFiltrado = res.ganancias;
          this.barChartData = [];
          this.barChartData.push({ data:[this.total, this.totalFiltrado], label: 'GANANCIAS' });
        }

      )

    }
  }


}
