import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Estado } from 'src/app/enums/estado';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';
declare var $: any;


@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {
  public estudiantes: Estudiante[] = [];
  public subEst!: Subscription;
  public cargando = false;
  public activo = Estado.ACTIVO;
  public inactivo = Estado.INACTIVO;
  public ALL = Estado.ALL;
  constructor(private _estS: EstudianteService) { }


  ngOnInit(): void {
    this.listar(Estado.ALL);
  }

  listar(estado: Estado) {
    this.estudiantes = [];
    this.deleteTable();
    this.cargando = true;
    if (estado === Estado.ALL) {
      this._estS.listar().subscribe(res => {
        setTimeout(() => {
          this.estudiantes = res;
          this.cargando = false;
          this.createDataTable();
        }, 200);
      });
    } else {
      this._estS.getByStatus(estado).subscribe(res => {
        setTimeout(() => {
          this.estudiantes = res;
          this.cargando = false;
          this.createDataTable();
        }, 200);
      });
    }

  }

  delete(boolean: boolean, est: Estudiante) {
    if (boolean) {
      this._estS.changeStatus(est, Estado.INACTIVO).subscribe(
        res => {
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      )
    } else {
      this._estS.changeStatus(est, Estado.PENDIENTE).subscribe(
        res => {
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      )
    }
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
